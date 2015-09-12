$(function () {
        $('#via-javascript-table').next().click(function () {
            $(this).hide();

            $('#table-javascript').bootstrapTable({
                method: 'get',
                url: 'data2.json',
                cache: false,
                height: 400,
                striped: true,
                pagination: true,
                pageSize: 50,
                pageList: [10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                showRefresh: true,
                minimumCountColumns: 2,
                clickToSelect: true,
                columns: [{
                    field: 'state',
                    checkbox: true
                }, {
                    field: 'id',
                    title: 'Item ID',
                    align: 'right',
                    valign: 'bottom',
                    sortable: true
                }, {
                    field: 'name',
                    title: 'Item Name',
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    formatter: nameFormatter
                }, {
                    field: 'price',
                    title: 'Item Price',
                    align: 'left',
                    valign: 'top',
                    sortable: true,
                    formatter: priceFormatter,
                    sorter: priceSorter
                }, {
                    field: 'operate',
                    title: 'Item Operate',
                    align: 'center',
                    valign: 'middle',
                    clickToSelect: false,
                    formatter: operateFormatter,
                    events: operateEvents
                }]
            });
        });
    });