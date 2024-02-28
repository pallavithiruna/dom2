var ele1=document.createElement("h1");
ele1.innerHTML="Pagination task";
ele1.setAttribute("id","title");
document.body.append(ele1);

var ele2=document.createElement("p");
ele2.innerHTML="This is a Pagination task";
ele2.setAttribute("id","description");
document.body.append(ele2);

var ele3=document.createElement("div");
ele3.setAttribute("class","table-responsive");
document.body.append(ele3);

var ele4=document.createElement("div");
ele4.setAttribute("id","buttons");
ele4.setAttribute("class","d-flex justify-content-center");
document.body.append(ele4);

var ex = document.createElement('div');
ex.setAttribute('class', 'tableData');

var cur_page = 0;
var records_per_page = 10;
var max_pages = Math.ceil(100 / records_per_page);

function prev_Page() {
    if (cur_page > 1) {
        changePage(cur_page - 1)
    }
}

function next_Page() {
    if (cur_page < max_pages) {
        changePage(cur_page + 1)
    }
}

function changePage(num) {
    if (num < 1) num = 1;
    if (num > max_pages) num = max_pages;

    var startPoint = (num - 1) * max_pages;
    var endPoint = (num) * max_pages;

    cur_page = num;
    CreateDataTable(startPoint, endPoint);

    if (num === 1) {
        document.getElementById('prev').style.visibility = "hidden";
    } else {
        document.getElementById('prev').style.visibility = "visible";
    }

    if (num === max_pages) {
        document.getElementById('next').style.visibility = "hidden";
    } else {
        document.getElementById('next').style.visibility = "visible";
    }
}

function CreateDataTable(start, end) 
{
    ex.innerHTML = " ";
var request=new XMLHttpRequest();
request.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
 request.send();
request.onload=function(){
   var result=JSON.parse(request.response);



var tableclass= document.createElement("table");
tableclass.setAttribute("class","table table-bordered");
tableclass.setAttribute("id","table");

var tablehead= document.createElement("thead");
tablehead.setAttribute("class","thead-dark");

var tablerow= document.createElement("tr");

var tablecol= document.createElement("th");
tablecol.innerHTML="Id"

var tablecol1= document.createElement("th");
tablecol1.innerHTML="Name";

var tablecol2= document.createElement("th");
tablecol2.innerHTML="Email";

var tablebody= document.createElement("tbody");

tablerow.append(tablecol,tablecol1,tablecol2);
tablehead.append(tablerow);
tableclass.append(tablehead,tablebody);
ex.append(tableclass);
for (let i = start; i < end; i++) {
    let tr1 = document.createElement('tr');

    let td1 = document.createElement('td');
    td1.innerHTML = result[i].id;
    let td2 = document.createElement('td');
    td2.innerHTML = result[i].name;
    let td3 = document.createElement('td');
    td3.innerHTML = result[i].email;

    tr1.append(td1, td2, td3);
    tablebody.append(tr1);
}

console.log(cur_page);
}}

var d = document.createElement('div');
d.setAttribute('class', 'anchorlist');

var prev = document.createElement('a');
prev.href = `javascript:prev_Page()`;
prev.id = "prev";
prev.innerHTML = "prev";

var next = document.createElement('a');
next.href = `javascript:next_Page()`;
next.id = "next";
next.innerHTML = "next";

var arr = createAnchorList();


function createAnchorList() {
    var ar = [];
    for (let i = 1; i <= 10; i++) {

        var a = document.createElement('a');
        a.href = `javascript:changePage(${i})`;
        a.innerHTML = i;
        if (i === 1) {
            a.setAttribute('class', 'active');
        }
        ar.push(a);
    }
    return ar;
}



document.body.append(ex, d);
d.append(prev, arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9], next);

changePage(1);