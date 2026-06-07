import { useState } from "react";

import axios from "axios";
import * as XLSX from "xlsx"
function App(){

  const [msg,setMsg] = useState("")
  const [status,setStatus] = useState(false)
  const [emailList,setEmailList]=useState([])
  function handleMsg(evt){
    setMsg(evt.target.value)
  }

  function handleFile(event){
     const file = event.target.files[0]
    console.log(file)
    
   
    const reader = new FileReader()

    reader.onload = function(e){
        const data = e.target.result
        const workbook = XLSX.read(data,{type:"binary"}) 
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const emailList = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
        const totalEmail = emailList.map(function(item){return item.A})
        console.log(totalEmail)
        setEmailList(totalEmail)
    }


    reader.readAsBinaryString(file)
  }
  function send(){
       setStatus(true)
       axios.post("https://bulk-mail-backend-iota.vercel.app/sendemail",{msg:msg,emailList:emailList})
       .then(function(data){
        if(data.data === true){
          alert("Email Sent Successfully")
          setStatus(false)
        }
        else{
          alert("Failed")
        }
       })
  }
  return (
    <div>
      <div className="bg-purple-900 text-white text-center">
        <h1 className="text-2xl font-medium px-5 py-3">BulkMail</h1>
      </div>

      <div className="bg-purple-800 text-white text-center">
        <h1 className="font-medium px-5 py-3">We can help with sending multiple emails at once</h1>
      </div>

      <div className="bg-purple-700 text-white text-center">
        <h1 className="font-medium px-5 py-3">Drag and Drop</h1>
      </div>

      
      <div className="bg-purple-500 flex flex-col items-center text-black px-5 py-3">
        <textarea onChange={handleMsg} value={msg} className="w-[60%] h-40 py-2 bg-white outline-none px-2 border border-black rounded-md" placeholder="Enter the Email Text.."></textarea>
      
      <div>
      <input type="file" onChange={handleFile} className="border-3 border-white file:text-gray text-black border-dashed py-4 px-4 mt-5 mb-5
      block text-sm  cursor-pointer file:mr-4 file:py-2 file:border-0
      file:text-sm file:font-semibold file:bg-purple-50 file-text-purple-700 hover:file:bg-purple-100
      file:transition-colors file:duration-200"></input>
      
      
    </div>
      
      <p>Total Emails in the File : {emailList.length}</p>

      <button onClick={send} className=" mt-2 bg-purple-950 py-2 px-2 text-white font-medium rounded-md w-fit">{status?"Sending...":"Send"}</button>
      </div>
      
     
      <div className="bg-purple-400 text-white text-center p-8">
      </div>

      
      <div className="bg-purple-300 text-white text-center p-8"> 
      </div>
    
    </div>
  );
}
 export default App;