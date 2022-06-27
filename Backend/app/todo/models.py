from django.db import models
from django.contrib.auth import get_user_model

class Todo(models.Model):
    title = models.CharField(max_length=50)
    some_number = models.PositiveIntegerField(default=0)
    some_number_string = models.CharField(max_length=12)
    description = models.TextField(blank=True)
    url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)
    posted_by = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        # when model is created and use .save() it will use modifed save method 
        if self.some_number:
            # it will automaticly convert some nuber to string while saving
            self.some_number_string=str(self.some_number)
        super(Todo, self).save(*args, **kwargs)

class Action(models.Model):
    # get_user_model() will get instance user
    user = models.ForeignKey(get_user_model(), null=True, on_delete=models.CASCADE)
    todo = models.ForeignKey(Todo, related_name="Todo", on_delete=models.CASCADE)