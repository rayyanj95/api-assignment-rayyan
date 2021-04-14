$(function(){
    loadRecipes();
    $("#recipes").on("click",".btn-danger",handleDelete);
    $("#recipes").on("click",".btn-warning",handleUpdate);
    $("#addBtn").click(addRecipe);
    $("#updateSave").click(function(){
        var id = $("$updateId").val();
        var title = $("$updateTitle").val();
        var details = $("$updateBody").val();
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/recipes" + id,
            data:{title,details},
            method:"PUT",
            success:{function(response){
                console.log(response);
                loadRecipes();
                $("updateModal").modal("hide");
            }}
        });
    });
});
function handleUpdate(){
    $("updateModal").modal("show");
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    $.get("https://usman-recipes.herokuapp.com/api/recipes" + id,function(response){
        $("#updateId").val(response._id);
        $("#updateTitle").val(response.title);
        $("#updateBody").val(response.body);
        $("#updateModal").modal("show");
    })
}
function addRecipe(title,details){
    var title = $("#title").val();
    var details = $("#details").val();
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "POST",
        data: {name:title, details:body} ,
        success: function(response){
            console.log(response);
            loadRecipes();
        },
        error:function(){
            alert("Failed to add new Recipe");
        }
    });
}
function handleDelete(){
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("data-id");
    console.log(id);
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes"+id,
        method: "DELETE",
        success:function(){
            loadRecipes();
        }
    });
}
function loadRecipes() {
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        error:function(response){
            var recipes = $("#recipes");
            recipes.html("Unkown Error Occured.");
        },
        success: function(response) {
            console.log(response);
            var recipes = $("#recipes");
            recipes.empty();
            for(var i=0; i< response.length; i++){
                var rec = response[i];
                recipes.append(`<div class="recipe" data-id="${rec._id}"><h3> ${rec.title} </h3><p><button class="btn btn-danger btn-sm float-right">Delete</button> <button class="btn btn-warning btn-sm float-right">Edit</button>${rec.body}</p></div>`); 
            }
            
        }
    });
}