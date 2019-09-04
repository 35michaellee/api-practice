function watchform(){
    $('.parks').submit(event => {
        event.preventDefault();
        getParks();

      });

}
function getParks(){
    clearprevious();
    let apikey="zwjp9eRle0K54hZ7bnQUvXfhs5pf7sZYXsXGWTn4";
    let baseurl="https://developer.nps.gov/api/v1/";
    let limit=$('#numberofresults').val();
    
    let stateinput=$('#input').val();
    let states= stateinput.split(" ");
    for(let i=0;i<states.length;i++){
        if(i==0){
        var statestring=`stateCode=${states[i]}`;}
        else{
            statestring=statestring+`&stateCode=${states[i]}`;}

    }
    
    
    let url=`${baseurl}parks?stateCode=${statestring}&limit=${limit}&api_key=${apikey}`;
    
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(responseJson => displayParks(responseJson))
    .catch(err => {
        console.log("error");
        console.error(error);
    });//where responsjson os the return value form the previus then sttement
    

}
function displayParks(responseJson){
    console.log(responseJson);
    console.log(responseJson.data.length);
    for(let i=0; i<responseJson.data.length;i++){
        $('.parksdata').append(
            `<p> ${i+1})name: ${responseJson.data[i].fullName}</p>
             <p> Description: ${responseJson.data[i].description}</p>
            <p> Website URL: ${responseJson.data[i].url}</p>`)
    }
    /*$('parksdata').append(
        '<p> name:' +responseJson.fullName+'<p>'
    )
    
*/

}
function clearprevious(){
    $('.parksdata').html('');

}
watchform();