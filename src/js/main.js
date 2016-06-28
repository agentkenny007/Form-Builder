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
            if (type == "textarea"){
                formObj = $(`
                    <div class="${type}">
                        <${type} id="${item.id}" placeholder="${item.label}"></${type}>
                        <i class="fa ${item.icon}"></i>
                    </div>`);
            } else if (type == "select") {
                formObj = $(`
                    <div class="${type}">
                        <${type} id="${item.id}">
                            <option value="">${item.label}</option>
                        </${type}>
                    </div>`);
                    item.options.forEach(function(o){ // for "option"
                        formObj.find(type).append(
                            option.clone().val(o.value).append(o.label)
                        );
                    });
            } else {
                formObj = input.clone()
                    .attr("id", item.id)
                    .attr("type", type)
                    .attr("placeholder", item.label)
                    .wrap(`<div class="${type}">`)
                    .append(`<i class="fa ${item.icon}"></i>`);
            }
            formContent.append(formObj);
        });
    },
    error: function(data){
        console.log("There was an error: " + data);
    }
})
