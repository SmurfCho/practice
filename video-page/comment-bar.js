var date=new Date();  
var myDate=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();  
var arr=new Array();
var pagesize=8;  
var curpage=0;//当前页数 
var len=new Array();
var id=0;
var rid=null;
var arrRe=new Array();
var comD=0;
var rClean=0;
                                                                   
function getContent(){  //获取评论
    var getComments=document.getElementById("comments").value;
    var nickName=document.getElementById("NickName").value;
    var flag=false;   
    if(getComments==""){alert("Please write your comment !"); return false;}
    arr[arr.length]=[nickName,myDate,getComments,id];
    id++;
} 

function checkComment(array,page){  
    var arry_return = new Array();  
    var start_t;  
    var end_t;  
    var start=page*pagesize;  //目前有多少条数据
    if(pagesize+start<array.length){  
        start_t = start;  
        end_t=pagesize+start;  
        for(var i=array.length-(end_t-start_t); i<array.length; i++){  
            arry_return.push(array[i]);  
        }  
    }  
    else if(pagesize+start>=array.length&&start<=array.length){ 
        start_t = start;  
        end_t=array.length;  
        for(var i=0; i<(array.length-start_t); i++){  
            arry_return.push(array[i]);  
        }  
    }  
    else if(start>array.length){  
        return arry_return;  
    }  
      
    return arry_return;//将筛选后的数据放到新的数组中  
} 

function showComment(array){//展示评论 
    var commentData=document.getElementById("commentData");  
    var t=commentData.childNodes;  
    for(var m=t.length-1; m>=0; m--){  
        commentData.removeChild(t[m]); //先将原来的表删掉
    }  
    for(var i=array.length-1;i>=0;i--){  
        var row=document.createElement("li");
        row.setAttribute("class","cmli");
        var cid=array[i][3]; 
        row.setAttribute("id",cid);
        var cellImg=document.createElement("img"); 
        cellImg.setAttribute("class","cportrait") 
        cellImg.setAttribute("src","0");
　　    var id=document.createElement("span"); 
        id.setAttribute("id","commentName");  
　　　  id.appendChild(document.createTextNode(array[i][0]));    
        var cellDate=document.createElement("span");  
        cellDate.setAttribute("id","commentDate"); 
        cellDate.appendChild(document.createTextNode(array[i][1]));   
        var cellComment=document.createElement("p"); 
        cellComment.setAttribute("id","commentContent")
        cellComment.appendChild(document.createTextNode(array[i][2]));
        var cellReply=document.createElement("input"); 
        cellReply.setAttribute("type","button");  
        cellReply.setAttribute("value","回复");
        cellReply.setAttribute("id","reply");
        cellReply.addEventListener("click",replyOrNot); 
        row.appendChild (cellImg);  
    　　row.appendChild (id);
        row.appendChild(cellDate);  
        row.appendChild(cellComment);
        row.appendChild(cellReply);   
        commentData.appendChild(row);


        var replyBlock=document.createElement("div");
        replyBlock.setAttribute("id","replyBlock");
        var replyAdd=document.createElement("div");
        replyAdd.setAttribute("class","replyAdd");
        var replyName=document.createElement("span");
        replyName.setAttribute("id","replyName");
        var replyComment=document.createElement("textarea");
        replyComment.setAttribute("id","replyComment");
        var replySubmit=document.createElement('input');
        replySubmit.setAttribute("id","replySubmit");
        replySubmit.setAttribute("type","button");  
        replySubmit.setAttribute("value","评论");
        replySubmit.addEventListener("click",submitReply);
        var replyData=document.createElement("ul");
        replyData.setAttribute("id","replyData");
        replyAdd.appendChild(replyName);
        replyAdd.appendChild(replyComment);
        replyAdd.appendChild(replySubmit);
        replyBlock.appendChild(replyAdd);
        replyBlock.appendChild(replyData);
        row.appendChild(replyBlock);
        //隐藏二级评论提交框
        var cmli_child=row.childNodes;
        for(var t=0; t<cmli_child.length;t++){ 
        if(cmli_child[t].nodeName == "#text" && !/\s/.test(cmli_child.nodeValue))
        {row.removeChild(cmli_child)};
        }
        var cmli_child5=row.childNodes[5];
        //var hide_child=row.childNodes[5].childNodes[0].style.display="none";
        replyAdd.style.display="none";
        if(rid!=null&&arrRe[i]!=null&&arrRe[i].length!=0){
            rid=row.id;
            comD=row.childNodes[5].childNodes[1];
            len[rid]=1;
            showRe(checkReply(arrRe[rid],len[rid]));
        }else{
        rid=row.id;
        arrRe[rid]=new Array();
        
        }
        var loadMore=document.createElement("div");
        loadMore.setAttribute("id","loadMore")
        var load=document.createElement("input");
        load.setAttribute("type","button")
        load.setAttribute("id","loadbtn");
        load.setAttribute("value","加载更多回复");
        load.addEventListener("click",moreReply);
        loadMore.appendChild(load);
        replyBlock.appendChild(loadMore);
        if(arrRe[i].length>8){
            loadMore.style.display="block";
        }else{
            loadMore.style.display="none";
        }
    

        
    }
        
}

function submitComment(){//input提交  
    getContent();  
    showComment(checkComment(arr,curpage));
    cleanBlock(); 
    document.getElementById("pagecount").innerHTML=arr.length;  
    document.getElementById("pagenum").innerHTML=Math.ceil(arr.length/pagesize);  
}  
function cleanBlock(){
    var clean=document.getElementById("comments");
    clean.value="";

}
function PerPage(){//上一页  
    (curpage<1)?curpage=0:curpage--;  
    showComment(checkComment(arr)); 
    var backToC=document.getElementById("pageUp");
    backToC.setAttribute("href","#commentHead") 
}  
function NextPage(){//下一页  
    var pagenum=Math.ceil(arr.length/pagesize);  
    (curpage<(pagenum-1))?curpage++:document.getElementById("pageDown").disabled="true";  
    showComment(checkComment(arr));  
    var backToC=document.getElementById("pageDown");
    backToC.setAttribute("href","#commentHead")
}  
function replyOrNot(e){
    e = e || window.event;
    var e1=e.srcElement || e.currentTarget;
    rid=e1.parentNode.id;
    var input_value=e1.value;
    var cmli=e1.parentNode;
    var cmli_child=e1.parentNode.childNodes;
    for(var i=0; i<cmli_child.length;i++){ 
    if(cmli_child[i].nodeName == "#text" && !/\s/.test(cmli_child.nodeValue))
    {cmli.removeChild(cmli_child)};
    }
    var cmli_child_child=cmli.childNodes[5].childNodes;
    for(var j=0; j<cmli_child_child.length;j++){ 
    if(cmli_child_child[j].nodeName == "#text" && !/\s/.test(cmli_child_child.nodeValue))
    {cmli.childNodes[5].removeChild(cmli_child_child)};
    }
    if(input_value==="回复"){
        //e = e || window.event;
        //var e1=e.srcElement || e.currentTarget;
        e1.setAttribute("value","收起");
        var show=cmli.childNodes[5].childNodes[0].style.display="block";
    }else if(input_value==="收起"){
        e1.setAttribute("value","回复");
        var hide=cmli.childNodes[5].childNodes[0].style.display="none";
    }
}
function subreply(e){
    e = e || window.event;
    var e1=e.srcElement || e.currentTarget;
    rid=e1.parentNode.parentNode.parentNode.parentNode.id;
    var input_value=e1.value;
    var reli=e1.parentNode.parentNode.parentNode.parentNode;
    var reli_child=e1.parentNode.parentNode.parentNode.parentNode.childNodes;
    for(var i=0; i<reli_child.length;i++){ 
    if(reli_child[i].nodeName == "#text" && !/\s/.test(reli_child.nodeValue))
    {reli.removeChild(reli_child)};
    }
    var reli_child_child=reli.childNodes[5].childNodes;
    for(var j=0; j<reli_child_child.length;j++){ 
    if(reli_child_child[j].nodeName == "#text" && !/\s/.test(reli_child_child.nodeValue))
    {reli.childNodes[5].removeChild(reli_child_child)};
    }
    if(input_value==="回复"){
        //e = e || window.event;
        //var e1=e.srcElement || e.currentTarget;
        e1.setAttribute("value","收起");
        var rshow=reli.childNodes[5].childNodes[0].style.display="block";
        var rNickname=e1.parentNode.childNodes[1].value;
        var rObject=reli.childNodes[5].childNodes[0].childNodes[1].value="@"+rNickname+":";

    }else if(input_value==="收起"){
        e1.setAttribute("value","回复");
        var hide=reli.childNodes[5].childNodes[0].style.display="none";
    }
}
function getReply(e){
    e = e || window.event;
    var e1=e.srcElement || e.currentTarget;
    var getRe=e1.parentNode.parentNode;//
    var getRe_child=getRe.childNodes;  
    for(var i=0; i<getRe_child.length;i++){ 
        if(getRe_child[i].nodeName == "#text" && !/\s/.test(getRe_child.nodeValue))
        {getRe.removeChild(getRe_child)};
    }
    var getReAdd_child=getRe.childNodes[0].childNodes;
    for(var j=0; j<getReAdd_child.length;j++){
        if(getReAdd_child[j].nodeName == "#text" && !/\s/.test(getReAdd_child.nodeValue))
        {getRe_child.removeChild(getReAdd_child)};
    }
    var getComments=getReAdd_child[1].value;
    comD=getRe_child[1];
    rClean=getReAdd_child[1];
    var nickName=getReAdd_child[0].value;
    var flag=false;   
    if(getComments==""){alert("Please write your comment !"); return false;}
    //arrRe[rid]=new Array(); 
    arrRe[rid][arrRe[rid].length]=[nickName,myDate,getComments];
}

function showRe(array){//展示回复
    
    var commentData=comD; 
    var t=commentData.childNodes;
    for(var m=t.length-1; m>=0; m--){  
        commentData.removeChild(t[m]); //先将原来的表删掉
    }    
    for(var i=array.length-1;i>=0;i--){  
        var row=document.createElement("li");
        row.setAttribute("id","reli") ;
　　　  var id=document.createElement("span");  
        id.setAttribute("class","sreplyN"); 
　　　  id.appendChild(document.createTextNode(array[i][0]));      
        var cellComment=document.createElement("p");
        cellComment.setAttribute("class","sreplyC") 
        cellComment.appendChild(document.createTextNode(id.value+":"+array[i][2]));
        var cellDate=document.createElement("span");
        cellDate.setAttribute("class","sreplyD");   
        cellDate.appendChild(document.createTextNode(array[i][1]));
        var cellReply=document.createElement("input"); 
        cellReply.setAttribute("type","button");  
        cellReply.setAttribute("value","回复"); 
        cellReply.setAttribute("class","reRe");
        cellReply.addEventListener("click",subreply);
        row.appendChild(cellComment);
        row.appendChild(cellDate);
        row.appendChild(cellReply);  
        commentData.appendChild(row);

    }



}  
function moreReply(){
    var pagenum=Math.ceil(arrRe[rid].length/pagesize);
    if(len[rid]<pagenum) {len[rid]++;
    }else{
        alert("已显示全部回复")
    }
    showRe(checkReply(arrRe[rid],len[rid]));
}
function checkReply(array,len){
    var arry_return = new Array();
    var curlen=len*pagesize;
    var start=array.length-curlen;
    if(curlen>=array.length){
        for(var i=0;i<array.length;i++){
            arry_return.push(array[i]);
        }
    }else{
        for(var i=start-1;i<array.length;i++){
        arry_return.push(array[i]);
        }
    }
        return arry_return;
}
function submitReply(e){  
    getReply();
    len[rid]=1;
    showRe(checkReply(arrRe[rid],len[rid])); 
    cleanRe();
    e = e || window.event;
    var e1=e.srcElement || e.currentTarget;
    var loadMore=e1.parentNode.parentNode.childNodes[2];
    if(arrRe[rid].length>8){
            loadMore.style.display="block";
        }else{
            loadMore.style.display="none";
        }
}
function cleanRe(e){
    var clean=rClean;
    clean.value="";
     e = e || window.event;
    var e1=e.srcElement || e.currentTarget;
    var cleanBlock=e1.parentNode;
    var hide=cleanBlock.style.display="none";
    var reply=e1.parentNode.parentNode.parentNode;
    reply.childNodes[4].setAttribute("value","回复");
}
