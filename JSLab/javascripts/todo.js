$(function(){
    const ENTER_CLICK = 13;
    var meu_login = "seu@email.com";
    var server = "http://livro-capitulo07.herokuapp.com";
    var $lastClicked;

    function updateTarefa(tarefaTexto, id){
        var params = {tarefa_id: id, texto: tarefaTexto};
        $.post(server + "/tarefa", params);
    }

    function onTarefaEditKeyup(event){
        if(event.which == ENTER_CLICK){
            salvarTarefaPendente($(this).parent(".tarefa-item"));
        }
    }

    function removerTarefa($removerItem){
        var $tarefaItem = $removerItem.parent(".tarefa-item");
        $tarefaItem.off("click");
        var params = {usuario: meu_login, tarefa_id: $tarefaItem.find(".tarefa-id").text(), _method: "DELETE"};
        $.post(server + "/tarefa", params, function(data){
            $tarefaItem.hide("slow");
        });
    }

    function focusParaNovaTarefa(){
        $("#tarefa").val(null).focus();
    }

    function salvarNovaTarefa($novaTarefa){
        var params = {usuario: meu_login, _method: "PUT", texto: $novaTarefa.find(".tarefa-texto").text()};
        $.post(server + "/tarefa", params, function(data){
            $novaTarefa.find(".tarefa-id").text(data.id);
        });
    }

    function adicionarTarefa(tarefa, id){
        id = id || 0;
        var $novaTarefa = $("<div />").addClass("tarefa-item")
            .append($("<div />").addClass("tarefa-id").text(id))
            .append($("<div />").addClass("tarefa-texto").text(tarefa))
            .append($("<div />").addClass("tarefa-delete"))
            .append($("<div />").addClass("clear"));
        $("#tarefa-list").append($novaTarefa);
        $(".tarefa-delete").click(onTarefaDeleteClick);
        $(".tarefa-item").click(onTarefaItemClick);
        if(id === 0){
            salvarNovaTarefa($novaTarefa);
        }
        focusParaNovaTarefa();
    }

    function editarTarefa($tarefaEditar){
       var $inputEdit = $("<input />").val($tarefaEditar.find(".tarefa-texto").text().trim()).addClass("tarefa-edit");
        var $tarefaId = $("<div />").addClass("tarefa-id").text($tarefaEditar.find(".tarefa-id").text().trim());
        $tarefaEditar.empty();
        $tarefaEditar.append($tarefaId)
            .append($inputEdit);
        $tarefaEditar.focus();
        $(".tarefa-edit").keyup(onTarefaEditKeyup);
    }

    function onTarefaDeleteClick(){
       removerTarefa($(this));
    }

    function onTarefaKeyUp(event){
        if(event.which === ENTER_CLICK && $(this).val() !== ""){
            adicionarTarefa($(this).val());
        }
    }

    function salvarTarefaPendente($tarefaPendente){
        var tarefa = $tarefaPendente.find(".tarefa-edit").val();
        var tarefaId = $tarefaPendente.find(".tarefa-id").text();
        $tarefaPendente.empty();
        $tarefaPendente.append($("<div />").addClass("tarefa-id").text(tarefaId))
            .append($("<div />").addClass("tarefa-texto").text(tarefa))
            .append($("<div />").addClass("tarefa-delete"))
            .append($("<div />").addClass("clear"));
        updateTarefa(tarefa, tarefaId);
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
        }
    }

    function carregarTarefas(){
        $("#tarefa").empty();
        var params = {usuario: meu_login};
        $.getJSON(server + "/tarefas", params).done(function(data){
            console.log("data: ", data);
            for(var tarefa = 0; tarefa < data.length; tarefa++) {
                adicionarTarefa(data[tarefa].texto, data[tarefa].id);
            }
        });
    }

    carregarTarefas();
    $("#tarefa").keyup(onTarefaKeyUp);

});