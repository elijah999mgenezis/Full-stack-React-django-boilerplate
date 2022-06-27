import graphene
from graphene_django import DjangoObjectType
from .models import Todo, Action
from users.schema import UserType
from django.db.models import Q
from graphql_jwt.decorators import login_required

class TodoType(DjangoObjectType):
    """
    The TodoType class generally converts python database Model[Todo] to Graphql Object Type.
    """
    class Meta:
        model = Todo


class ActionType(DjangoObjectType):
    """
    The ActionType class generally converts python database Model[Action] to Graphql Object Type.
    """
    class Meta:
        model = Action


class Query(graphene.ObjectType):
    """
    This Query class allows you to fetch/search data related to Todo model.
    """
    # Graphql query parameters
    todos = graphene.List(TodoType, search=graphene.String())
    actions = graphene.List(ActionType)

    def resolve_todos(self, info, search=None):
        """
        This method has one (search) parameter which default is None. Ignoring the (search) parameter you get all the (Todo) Todos list. If the parameter 
        is provided the you get only the list of Todos according to the search parameter.
        """
        if search:
            filter = (
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(url__icontains=search) |
                Q(posted_by__username__icontains=search)
            )
            return Todo.objects.filter()

        return Todo.objects.all()

    def resolve_actions(self, info):
        """
        This method returns all the actions as list those belongs to the Todo model.
        """
        return Action.objects.all()

class CreateTodo(graphene.Mutation):
    """
    This CreateTodo class allows to create a todo on preference.
    """
    # Graphql query parameter
    todo = graphene.Field(TodoType)

    class Arguments:
        """
        This Arguments class takes 3 inputs for the todo object creation. Inputs are (title,description,url).
        """
        title = graphene.String()
        description = graphene.String()
        url = graphene.String()
    
    @login_required
    def mutate(self, info, **kwagrs):
        """
        This method generally creates a Todo object according to the given parameters
        """
        user = info.context.user
        todo = Todo(title=kwagrs.get('title'), description=kwagrs.get('description'), url=kwagrs.get('url'), posted_by=user , some_number=5)
        todo.save()

        return CreateTodo(todo=todo)

class UpdateTodo(graphene.Mutation):
    """
    This UpdateTodo class allows you to make changes to the todos user created.
    """
    # Graphql query parameter
    todo = graphene.Field(TodoType)

    class Arguments:
        """
        This Arguments class takes 4 inputs for the todo object updation. Inputs are (todoId,title,description,url).
        """
        todo_id = graphene.Int()
        title = graphene.String()
        description = graphene.String()
        url = graphene.String()

    @login_required
    def mutate(self, info, **kwargs):
        """
        This method allows you to insert a todo object according to the given parameters into the database. It requires user authentication.
        """
        user = info.context.user
        todo = Todo.objects.get(id=kwargs.get('todo_id'))
        todo.title = kwargs.get('title')
        todo.description = kwargs.get('description')
        todo.url = kwargs.get('url')
        todo.some_number=10

        todo.save()
        # return UpdateTodo(todo=todo) will return in query parameter
        return UpdateTodo(todo=todo)


class DeleteTodo(graphene.Mutation):
    """
    This DeleteTodo class allows you to delete a todo from the database.
    """
    # Graphql query parameter
    todo_id = graphene.Int()

    class Arguments:
        """
        This Arguments class takes 1 input(todo_id) for the todo deletion process. 
        """
        todo_id = graphene.Int(required=True)
    
    @login_required
    def mutate(self, info, **kwagrs):
        """
        This method takes care of the deletion process. It delete a todo record from the database. It requires user authentication.
        """
        user = info.context.user
        todo_id = kwagrs.get('todo_id')
        todo = Todo.objects.get(id=todo_id)

        todo.delete()

        return DeleteTodo(todo_id=todo_id)

class CreateActionTodo(graphene.Mutation):
    """
    This CreateActionTodo allows you to add a todo to the user preference.
    """
    # Graphql query parameters
    user = graphene.Field(UserType)
    todo = graphene.Field(TodoType)

    class Arguments:
        """
        This Arguments class take 1 input (todo_id)
        """
        todo_id = graphene.Int()

    @login_required
    def mutate(self, info, **kwagrs):
        """
        This method adds a todo to the user action list. It requires user authention.
        """
        user = info.context.user
        todo_id = kwagrs.get("todo_id")
        todo = Todo.objects.get(id=todo_id)

        Action.objects.create(
            user=user,
            todo=todo
        )

        return CreateActionTodo(user=user, todo=todo)

class Mutation(graphene.ObjectType):
    """
    This Mutation class allows you to write your query for the Todo CRUD operations. Query starts with {create_todo,update_todok,delete_todo,action_todo}
    """
    create_todo = CreateTodo.Field()
    update_todo = UpdateTodo.Field()
    delete_todo = DeleteTodo.Field()
    action_todo = CreateActionTodo.Field()