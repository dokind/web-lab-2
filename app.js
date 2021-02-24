function generate_year_range(start, end) {
    var years = "";
    for (var year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();

selectYear = 2021;

selectMonth = document.getElementById("month");


createYear = generate_year_range(2021, 2021);

document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');

var months = "";
var days = "";

var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var calendar = {jan: {1: "Сайхан амарна"}, 
                feb: {1: "Сагсны тэмцээнтэй", 3: "Шагнал гардуулна даа", 17: "Жавхлан багшийн лаб 2-ыг хийнэ"}, 
                mar: {2: "Энэ лабынхаа хугацааг сунгах уу яах вэ гэдэгээ шийднэ", 6: "Энд юу бичье дээ байз", 8: "Эмэгтэйчүүддээ баяр хүргэнэ дээ"}, 
                apr: {1: "Бүгдээрээ худлаа ярьцаагаагаарай"}, 
                may: {10: "Энэ сард ч ёстой юу ч болдоггүй сар даа"}, 
                jun: {6: "Жавхлан багшийн төрсөн өдөр"},  
                jul: {4: "Хичээл амарсаан ураа"}, 
                aug: {1: "Хөдөө явдаг цаг даа", 25: "Хичээл сонголт эхэллээ"}, 
                sep: {1: "9-н сарын нэгэн боллоо ерөөсөө бидний баяр даа"}, 
                oct: {13: "Сур сур бас дахин сур"}, 
                nov: {2: "Сурсаар л бай"}, 
                dec: {20: "Өвлийн семистер хаагдах нь дээ", 30: "Дүн гаргаж дууслаа баярлалаа баяртай"} 
            }


var $dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";

document.getElementById("thead-month").innerHTML = $dataHead;


monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);



function next() {
    currentYear = 2021;

    currentMonth = (currentMonth == 11) ? 0 : currentMonth + 1 ;
    
 
        
        for(i=0;i<12;i++){
            
            if(document.querySelector("#monthAndYear").innerHTML == months[currentMonth]){

                var result =JSON.stringify(calendar[`${months[currentMonth]}`]).replace(`,`,"").replace(`{`,"").replace(`}`,"").replace(`:`,". ").replace(/"/g,"");
                document.querySelector(".result").innerHTML = result;
              //  document.querySelector(`.test${currentMonth}`).style.backgroundColor = "red";
            
                break;
            }   
        //    }
        
            showCalendar(currentMonth, currentYear);
        }
        console.log(currentMonth);
      }


function previous() {
    currentYear = 2021;

    currentMonth = (currentMonth == 0) ? 11 : currentMonth - 1 ;
    
        
        for(i=0;i<12;i++){
            
            if(document.querySelector("#monthAndYear").innerHTML == months[currentMonth]){
                var result =JSON.stringify(calendar[`${months[currentMonth]}`]).replace(`,`,"").replace(`{`,"").replace(`}`,"").replace(`:`,". ").replace(/"/g,"");
                document.querySelector(`.test${months[currentMonth]}`).style.backgroundColor = "pink";
                document.querySelector(".result").innerHTML = result;
                break;
            }   
            showCalendar(currentMonth, currentYear);
        }
        console.log(currentMonth);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    var firstDay = ( new Date( year, month ) ).getDay();

    tbl = document.getElementById("calendar-body");

    
    tbl.innerHTML = "";

    
    monthAndYear.innerHTML = months[month] 
    // + " " + year
    ;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    var date = 1;
    for ( var i = 0; i < 6; i++ ) {
        
        var row = document.createElement("tr");

        
        for ( var j = 0; j < 7; j++ ) {
            if ( i === 0 && j < firstDay ) {
                cell = document.createElement( "td" );
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = `<span class="test${date}">` + date + "</span>";

                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cell.className = "date-picker selected";
                }
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row);
    }

}



function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}