
# This is the backend part of the project.

Used Tech Stack

## 1.Django
## 2.PostgreSQL
## 3.GraphQl

## Running on your Machine
First install packages requirements.txt file by the following command

```
pip install -r requirements.txt
```
***
After the successfull installation goto backend/app/app/settings.py
Then inside setting.py edit the database credentials
  -> Provide database name
  -> Provide database username
  -> Provide database password
  
 ***
 Now run the following command to sync database with the migrations
 makemigrations initializes models 
 migrate creates databace models

 ```
 python manage.py makemigrations
 python manage.py migrate
 ```
 
 ***
 
 Finally run the below command to start the server

 `python manage.py runserver`

 [goto localhost:8000/](http://127.0.0.1:8000/)
 
 ***
 ## Graphql Api Uses
  ***
  hit [localhost:8000/graphql/](http://127.0.0.1:8000/graphql/)
  now in the graphql explorer you can perform following queries
  ***
 ### To get all the todos list
 Query:
 ```
 {
  todos{
    id
    title
    description
    url
    postedBy{
      id
      username
    }
  }
}
 ```

 ### To create a user
 Mutation:
 ```
 mutation{
  createUser(username: "admin", email: "example@gmail.com", password: "pass1234567"){
    user{
      id
      username
      email
      dateJoined
    }
  }
}
 ```
 ### To get a token for a user
 Mutation:
 ```
 mutation{
  tokenAuth(username: "admin", password: "pass1234567"){
    token
  }
}
 ```
 
 ### To create a Todo object
 Pass token to the header Authorization properly:
 ![auth](https://github.com/elijah999mgenezis/Full-stack-React-django-boilerplate/blob/main/example-Images/auth-header.png "Auth Header")
 
 Mutation:
 ```
 mutation{
  createTodo(title: "title name", description: "description data", url: "http://example.com"){
    todo{
      id
      title
      description
      url
      postedBy{
        id
        username
      }
    }
  }
}
 ```

 
 ### To update a todo
 Mutation:
 ```
 mutation{
  UpdateTodo(todoId: 1, title: "new title", description: "updated description", url: "http://newexample.com"){
    todo{
        id
    }
  }
}
 ```
 ### To delete a todo
 Mutation:
 ```
 mutation{
  DeleteTodo(todoId: 4){
    todoId
  }
}
 ```

### To search a todo
Query:
```
{
  todos(search: "a"){
    title
    description
    url
  }
}
```


