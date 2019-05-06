//Set the file path
var file_path = "doc.txt"




const fs = require('fs')

function findinlist(list, item){
    count2 = 0
    while (count2 < list.length){
        if(item == list[count2]){
            return(count2)
        }
        count2+=1
    }
    return("Error")
}

function has(list, item){
    count = 0
    while (count < list.length){
        if(item == list[count]){
            return(true)
        }
        count+=1
    }
    return(false)
}
fs.readFile(file_path, (err, data) => { 
    if (err) throw err; 
  
    //Get file
     file = data.toString()
     //console.log(file)

     //Get lines in list
     var lines = file.split("\n");
     count = 0

     //Clean list
     while (count < lines.length){
            lines[count] = lines[count].replace(/\r/g, "");
            count+=1

     }
     //Assign variables
     var list_vars_name = []
     var list_vars_data = []

     count = 0
     while (count < lines.length){
        var do_not_advance = 0
        line = lines[count]
        if (list_vars_data ==null || list_vars_name ==null){
            throw new Error(`Critical Process Died (NO_VARIABLES)`)
        }
        if(Number(count) < 0){
            throw new Error(`Illegal line read (Terminal tried to read line: ${count}, failed). Wait.. How did this even happen`)
        }


       // console.log("Interperted a line...")
        //Comment parsing

        if(line.startsWith("//")){
            //Do nothing
     }
     else if(line.startsWith(">end")){
       count = lines.length +10
    }

       //Say Parsing
        else if(line.startsWith(">say ")){
            var tosay = line.replace(/>say /g, "");
            if(tosay.includes(`"`)){
                console.log(tosay.replace(/"/g, ""))
            }
            else{
                var number1 = findinlist(list_vars_name,tosay)
                if(number1=="Error"){
                    throw new Error(`Invalid syntax: ${tosay} is not defined. (Line${count+1})`)
                }
                else{
                    console.log(list_vars_data[number1])
                }
                
            }
        }
        else if(line.startsWith(">moveto ")){
            var total_count_line_moveto = line.replace(/>moveto /g, "");
            var count_save = count
            count = Number(total_count_line_moveto)
            if(isNaN(count)){
                throw new Error(`Illegal line movement (Tried to move to line: ${total_count_line_moveto}, failed [NaN] ) (Line ${count_save})`) 
            }
            if(Number(count) > lines.length){
                throw new Error(`Illegal line movement (Tried to move to line: ${count}, failed [does not exist] ) (Line ${count_save})`)
            }
            if(Number(count) < 0){
                throw new Error(`Illegal line movement (Tried to move to line: ${count}, failed [does not exist] ) (Line ${count_save})`)
            }
            do_not_advance = 1
        }

        //Var Parsing
        else if(line.startsWith(">var ")){
            var todo = line.replace(/>var /g, "");

            todo = todo.split(" = ")
            var varname = todo[0]
            var vardata = todo[1]
            if(varname.includes(">")){
                throw new Error(`Cannot assign a variable to a command (Line${count+1})`)
            }
            if(varname.includes(" ")){
                throw new Error(`Illegal variable assignment (Line${count+1})`)
            }
            //varname = varname.replace(/ /g, "");
            //vardata= vardata.replace(/ /g, "");
            list_vars_data.push(vardata)
            list_vars_name.push(varname)
        }
        else if(line==""){
//do nada
        }
        else if(line==">"){
            throw new Error(`Imput was given with no command (Line${count+1})`)

        }
        else{
            throw new Error(`Invalid syntax (Line${count+1})`)

        }


        if(do_not_advance !=1){
        count = count +1
        }
     }

}) 
