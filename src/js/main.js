import $ from 'jquery';

var formContent = $('.form-content');
var input = $('<input>'), option = $('<option>');

// $.getJSON({
//     url: 'http://json-data.herokuapp.com/forms'
// }).then(function(data){
//     function (data){
//         console.log(data);
//     },
//     function (data){
//
//     }
// });

$.ajax({
    url: "http://json-data.herokuapp.com/forms",
    success: function(data){
        console.log(data);
        data.forEach(function(item){
            var formObj, type = item.type;
            if (type == "textarea")
                formObj = $(`<${type} id="${item.id}" placeholder="${item.label}"></${type}>`);
            else if (type == "select") {
                formObj = $(`
                    <${type} id="${item.id}">
                        <option>${item.label}...</option>
                    </${type}>`);
                    item.options.forEach(function(o){ // for "option"
                        formObj.append(option
                            .clone()
                            .val(o.value)
                            .append(o.label)
                        );
                    });
            } else {
                formObj = input
                    .clone()
                    .attr("id", item.id)
                    .attr("type", type)
                    .attr("placeholder", item.label);
            }
            formContent
                .append(formObj);
            formObj
                .wrap(`<div class="${type}"></div>`)
                .parent()
                .append(function(){ if (item.icon) return `<i class="fa ${item.icon}"></i>`; });
        });
    },
    error: function(data){
        console.log("There was an error: " + data);
    }
})
