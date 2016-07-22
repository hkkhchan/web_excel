$(document).ready(function(){
	var container = document.getElementById('excelTableExample');
	var	hot;
	var row_arr=[];
	var sql_col_arr= ['manufacturer','year','price'];
	var col_arr= ['Manufacturer','Yr','$'];
	var hot = new Handsontable(container, {
		data: null,
		rowHeaders: true,
		colHeaders: col_arr,
		colWidths: [150, 100, 100],
		columnSorting: true,
		columns: [
			{data: 0},
			{data: 1}, // if type is numeric pls use "type: 'numeric', format: '0'"
			{data: 2}
		],
		manualColumnMove: false,
		manualColumnResize: true,
		manualRowMove: false,
		manualRowResize: true,
		minSpareRows: 1,
		persistentState: true,
		sortIndicator: true,
		contextMenu: {
			items: {
				'remove_row':{},
				'undo':{},
				'redo':{},
				'setcolor':{ 
								name: "Set Font Color",
								submenu: {
									items:[ 
										{
											name: '<span class="isq color0"></span>red',
											callback: function(key,option){
												setColor('color','#ff0000');
											},
											key: 'setcolor:l'
										},
										{
											name: '<span class="isq color1"></span>orange',
											callback: function(key,option){
												setColor('color','#ffa500');
											},
											key: 'setcolor:2'
										},											
										{
											name: '<span class="isq color2"></span>yellow',
											callback: function(key,option){
												setColor('color','#ffff00');
											},
											key: 'setcolor:3'
										},												
										{
											name: '<span class="isq color3"></span>goldenrod',
											callback: function(key,option){
												setColor('color','#daa520');
											},
											key: 'setcolor:4'
										},
										{
											name: '<span class="isq color4"></span>green',
											callback: function(key,option){
												setColor('color','#008000');
											},
											key: 'setcolor:5'
										},
										{
											name: '<span class="isq color5"></span>limo',
											callback: function(key,option){
												setColor('color','#00ff00');
											},
											key: 'setcolor:6'
										},											
										{
											name: '<span class="isq color6"></span>blue',
											callback: function(key,option){
												setColor('color','#0000ff');
											},
												key: 'setcolor:7'
										},
										{
											name: '<span class="isq color7"></span>light blue',
											callback: function(key,option){
												setColor('color','#add8e6');
											},
												key: 'setcolor:8'
										},
										{
											name: '<span class="isq color8"></span>agna',
											callback: function(key,option){
												setColor('color','#00ffff');
											},
												key: 'setcolor:9'
										},
										{
											name: '<span class="isq color9"></span>medium purple',
											callback: function(key,option){
												setColor('color','#9370db');
											},
												key: 'setcolor:10'
										},
										{
											name: '<span class="isq color10"></span>black',
											callback: function(key,option){
												setColor('color','#000000');
											},
												key: 'setcolor:11'
										},
										{
											name: '<span class="isq color11"></span>white',
											callback: function(key,option){
												setColor('color','#ffffff');
											},
												key: 'setcolor:12'
										},											
										]		
							}
					},
				'setbcolor':{ 
								name: "Set Background Color",
								submenu: {							
									items:[ 
										{
											name: '<span class="isq color0"></span>red',
											callback: function(key,option){
												setColor('background-color','#ff0000');
											},
											key: 'setbcolor:l'
										},
										{
											name: '<span class="isq color1"></span>orange',
											callback: function(key,option){
												setColor('background-color','#ffa500');
											},
											key: 'setbcolor:2'
										},											
										{
											name: '<span class="isq color2"></span>yellow',
											callback: function(key,option){
												setColor('background-color','#ffff00');
											},
											key: 'setbcolor:3'
										},												
										{
											name: '<span class="isq color3"></span>goldenrod',
											callback: function(key,option){
												setColor('background-color','#daa520');
											},
											key: 'setbcolor:4'
										},
										{
											name: '<span class="isq color4"></span>green',
											callback: function(key,option){
												setColor('background-color','#008000');
											},
											key: 'setbcolor:5'
										},
										{
											name: '<span class="isq color5"></span>limo',
											callback: function(key,option){
												setColor('background-color','#00ff00');
											},
											key: 'setbcolor:6'
										},											
										{
											name: '<span class="isq color6"></span>blue',
											callback: function(key,option){
												setColor('background-color','#0000ff');
											},
												key: 'setbcolor:7'
										},
										{
											name: '<span class="isq color7"></span>light blue',
											callback: function(key,option){
												setColor('background-color','#add8e6');
											},
												key: 'setbcolor:8'
										},
										{
											name: '<span class="isq color8"></span>agna',
											callback: function(key,option){
												setColor('background-color','#00ffff');
											},
												key: 'setbcolor:9'
										},
										{
											name: '<span class="isq color9"></span>medium purple',
											callback: function(key,option){
												setColor('background-color','#9370db');
											},
												key: 'setbcolor:10'
										},
										{
											name: '<span class="isq color10"></span>black',
											callback: function(key,option){
												setColor('background-color','#000000');
											},
												key: 'setbcolor:11'
										},
										{
											name: '<span class="isq color11"></span>white',
											callback: function(key,option){
												setColor('background-color','#ffffff');
											},
												key: 'setbcolor:12'
										},											
										]	
							}
					},						
			},	
		},
	});
	hot.addHook('afterChange', function(change,source){
			var data_c=[];
			var flag=true;
			if (source==='loadData'){
				return 0;
			}
			change.forEach(function(item){
				var d_arr=[];
				var tmp=parseInt(item[0]);
				var phyIndex=(hot.sortingEnabled && hot.sortIndex && hot.sortIndex.length)?hot.sortIndex[tmp][0]:item[0];
				var first_column=$('.htCore tr:nth-of-type('+(item[0]+1)+')>td:first-of-type').text(); //if the id is not first column, pls change "first-of-type" to "nth-of-type(x)"
				if (!first_column) {
					alert('input error');
					loadTable();
					flag=false;
				}	
				d_arr.push(phyIndex); //row 
				d_arr.push(sql_col_arr[item[1]]); //column
				d_arr.push(first_column); //first column of the row
				d_arr.push(item[2]); //old value
				d_arr.push(item[3]); //new value				
				data_c.push(d_arr);
			});
			if (flag){
				$.post('mysave.php',{action:'save', data: data_c, fc: sql_col_arr[0]},function(d){
					loadFormat();						
				});
			}	
	});
    hot.addHook('afterRemoveRow', function(index, amount) {
		var row=[];
		var myIndex=parseInt(index);
		for (i=0;i<amount;i++){
			phyIndex=(hot.sortingEnabled && hot.sortIndex && hot.sortIndex.length)?hot.sortIndex[myIndex+i][0]:myIndex+i;
			row.push(row_arr[phyIndex]);
		}
		$.post('mysave.php',{action:'rev_row',data: row, fc: sql_col_arr[0]});
    });	
	loadTable();

	$('.columnSorting').click(function(){loadFormat();});
	//window.setInterval(refreshTable, 10000);
	
	function refreshTable(){
		$('body').trigger({
			type: 'keyup', which : 27
		});
		console.log('refresh');
		loadTable();
	}
	
	function loadTable(){
		var arr=[];
		row_arr=[];
		$.getJSON('load.php',function(d){
			json=jQuery.parseJSON(JSON.stringify(d));
			var sub_arr=[];
			$.each(json.cells,function(i,o){
					sub_arr=[];
					for (tmp=0;tmp<sql_col_arr.length;tmp++){
						sub_arr.push(o[sql_col_arr[tmp]]);
					}
					arr.push(sub_arr);
					row_arr.push(o[sql_col_arr[0]]);
				});
			hot.loadData(arr);
			loadFormat();
		});	
	}
	
	function loadFormat(){
		var arr=[];
		$.post('mysave.php',{action:'load_format'},function(d){
			json=jQuery.parseJSON(JSON.stringify(d));
			$.each(json.fmts,function(i,o){
				row_no = $('td:first-of-type').filter(function() {
					return $(this).text() == o['row_id'];
				}).closest("tr").index()+1;
				col_no = sql_col_arr.indexOf(o['col_name'])+1;
				ele='.htCore tr:nth-of-type(' + row_no + ')>td:nth-of-type(' + col_no + ')';
				$(ele).css('background-color', o['background_color']==undefined?'':o['background_color']);
				$(ele).css('color', o['color']==undefined?'':o['color']);
			});
		},'json');	
	}
	
	function setColor(type,color){
		var arr=[];
		$($('td.area').length?'td.area':'td.current').each(function(){
			var sub_arr=[];
			sub_arr.push($(this).parent().find('td:first-of-type').text()); //first column
			sub_arr.push(sql_col_arr[$(this).index()-1]); //column name
			arr.push(sub_arr);
		});
		$('td.area, td.current').css(type,color);
		$.post('mysave.php',{
			action:'set_color', 
			data: arr,
			type: type,
			color: color}
		);
	}
});	

