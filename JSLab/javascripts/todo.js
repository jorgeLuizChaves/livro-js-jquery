$(function(){
    const ENTER_CLICK = 13;
    var $lastClicked;

    function onTarefaEditKeyup(event){
        if(event.which == ENTER_CLICK){
            salvarTarefaPendente($(this).parent(".tarefa-item"));
        }
    }

    function removerTarefa($removerItem){
        var $tarefaItem = $removerItem.parent(".tarefa-item");

        $tarefaItem.off("click")
         $tarefaItem.hide("slow");
    }

    function focusParaNovaTarefa(){
        $("#tarefa").val(null).focus();
    }

    function adicionarTarefa($tarefa){
        var $novaTarefa = $("<div />").addClass("tarefa-item")
            .append($("<div />").addClass("tarefa-texto").text($tarefa.val()))
            .append($("<div />").addClass("tarefa-delete"))
            .append($("<div />").addClass("clear"));

        $("#tarefa-list").append($novaTarefa);
        $(".tarefa-delete").click(onTarefaDeleteClick);
        $(".tarefa-item").click(onTarefaItemClick);

        focusParaNovaTarefa();
    }

    function editarTarefa($tarefaEditar){
       var $inputEdit = $("<input />").val($tarefaEditar.text().trim()).addClass("tarefa-edit");
        $tarefaEditar.html($inputEdit);
        $(".tarefa-edit").keyup(onTarefaEditKeyup);
    }

    function onTarefaDeleteClick(){
       removerTarefa($(this));
    }

    function onTarefaKeyUp(event){
        if(event.which === ENTER_CLICK){
            adicionarTarefa($(this));
        }
    }

    function salvarTarefaPendente($tarefaPendente){
        var tarefa = $tarefaPendente.find(".tarefa-edit").val();

        $tarefaPendente.empty();

        $tarefaPendente.append($("<div />").addClass("tarefa-text").text(tarefa))
            .append($("<div />").addClass("tarefa-delete"))
            .append($("<div />").addClass("clear"));

        $(".tarefa-delete").click(onTarefaDeleteClick);
        $(".tarefa-item").click(onTarefaItemClick);
    }

    function onTarefaItemClick(){
        if(!$(this).is($lastClicked)){
            if($lastClicked !== undefined){
                salvarTarefaPendente($lastClicked);
            }
            editarTarefa($(this));
            $lastClicked = $(this);
            console.log("edit");
        }

    }

    $(".tarefa-delete").click(onTarefaDeleteClick);
    $("#tarefa").keyup(onTarefaKeyUp);
    $(".tarefa-item").click(onTarefaItemClick);
});