$(function(){
    $lastClicked = false;
    function onTarefaEditClick(event){
        if(event.which === 13){
            var tarefaEditada = $(this).find(".tarefa-edit").val();

            if(tarefaEditada !== null && tarefaEditada !== ""){
                $(this).off();
                $(this).parent(".tarefa-edit-item");

                $(this).children().each(function(i, div){
                    $(div).remove();
                });
                $(this).empty();
                $(this).append("<div class='tarefa-texto'>" + tarefaEditada + "</div>")
                    .append("<div class='tarefa-delete'></div>")
                    .append("<div class='clear'></div>");

                $(this).removeClass("tarefa-edit-item");
                $(this).addClass("tarefa-item");
                $lastClicked = false;

                $(".tarefa-delete").click(onTarefaDelete);
                $(".tarefa-item").click(onTarefaItemClick);
            }
        }
    }

    function criarTarefa(tarefa){
        var $novaTarefa = $("<div />")
            .addClass("tarefa-item")
            .append($("<div />")
                .addClass("tarefa-texto")
                .text(tarefa))
            .append($("<div />")
                .addClass("tarefa-delete"))
            .append($("<div />")
                .addClass("clear"));
        $("#tarefa-list").append($novaTarefa);

        $("#tarefa").keydown(onTarefaKeyDown);
        $(".tarefa-item").click(onTarefaItemClick);
        $(".tarefa-delete").click(onTarefaDelete);
    }

    function onTarefaKeyDown(event){
        if(event.which === 13){
            var tarefa = $("#tarefa").val();
            if(tarefa !== null && tarefa !== ""){
                criarTarefa(tarefa);
            }

            $("#tarefa").val(null);
            $("#tarefa").focus();
        }
    }

    function onTarefaDelete(){
        $(this).parent(".tarefa-item").hide("slow", function(){
            $(this).remove();
        })

        $("#tarefa").val(null);
        $("#tarefa").focus();
    }

    function onTarefaItemClick(){
        if(!$lastClicked){
        $(this).off();
        var $tarefaItem = $(this);

        var tarefa = $tarefaItem.find(".tarefa-texto").text();

        $tarefaItem.children().each(function(i, div){
            $(div).remove();
        });

        var $editarTarefa = $("<input class='tarefa-edit' type='text' value='" + tarefa + "' />");

        $tarefaItem.append($editarTarefa);

        $tarefaItem.removeClass("tarefa-item");
        $tarefaItem.addClass("tarefa-edit-item");
        $lastClicked = true;

        $(".tarefa-edit-item").keydown(onTarefaEditClick);
        $(".tarefa-edit-item").find(".tarefa-edit").focus();
    }

    }

    function teste(){
        var $tarefasItens = $(".tarefa-item").children();

        $tarefasItens.each(function(i, item){
            $(item).text = "hi";
        });

    }


    $("#tarefa").keydown(onTarefaKeyDown);
    $(".tarefa-delete").click(onTarefaDelete);
    $(".tarefa-item").click(onTarefaItemClick);
});
