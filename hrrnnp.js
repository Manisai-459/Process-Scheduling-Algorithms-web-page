const form = document.getElementById("sjfn-form");
const processTable = document.getElementById("processes");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const n = parseInt(document.getElementById("process-count").value);

    // Create dynamic form fields for each process
    let formHtml = "";
    for (let i = 1; i <= n; i++) {
      formHtml += `
      <tr>
      <td>${'P'+i}</td>
       <td> <label for="arrival-time-${i}"><input type="number" class= "inout_style"  id="arrival-time-${i}" name="arrival-time-${i}" min="0" required></label></td>
       <td> <label for="burst-time-${i}"> <input type="number" class= "inout_style"  id="burst-time-${i}" name="burst-time-${i}" min="1" required></label></td>
    </tr>
      `;
    }
    processTable.getElementsByTagName("tbody")[0].innerHTML = formHtml;
  
    // Show calculate button
    const calculateBtn = document.getElementById("calculate-btn");
    calculateBtn.style.display = "block";
});
document.getElementById("calculate-btn").addEventListener("click", function (event) {
  event.preventDefault();
    // Get arrival time and burst time for each process
    class proc{
        constructor(id,a,b){
            this.id = id;
            this.arrivalTime = a;
            this.burstTime = b;
        }
    }
    class ready_queue {
        constructor(id, a, b, rr) {
          this.id = id;
          this.a = a;
          this.b = b;
          this.rr = rr;
        }
      }
      class ganttChart {
        constructor(id, a, b) {
          this.id = id;
          this.s = a;
          this.e = b;
        }
      }
    const proces = [];
    let d = 0;
    const n = parseInt(document.getElementById("process-count").value);
    for (let i = 1; i <= n; i++) {
      const arrivalTime = parseInt(document.getElementById(`arrival-time-${i}`).value);
      if(isNaN(arrivalTime)){
        d = 1;
        break;
      }
      const burstTime = parseInt(document.getElementById(`burst-time-${i}`).value);
      if(isNaN(burstTime) || burstTime == 0){
        d = 1;
        break;
      }
      proces.push(new proc(i,arrivalTime,burstTime));
    }
    if(d != 1){
      proces.sort((m, n) => {
        if(m.arrivalTime == n.arrivalTime)
          return m.burstTime - n.burstTime;
        return m.arrivalTime - n.arrivalTime;
      });
      let j = 0,t,x = 0;
      const rq = [];
      const g = [];
      rq.push(
        new ready_queue(
            proces[j].id,
            proces[j].arrivalTime,
            proces[j].burstTime,1
        )
      );
      j += 1;
      
      while (rq.length != 0) {
        x = 0;
        console.log("h : "+rq[0].rr)
        if (g.length == 0) t = rq[0].a;
        else if (g[g.length - 1].e < rq[0].a) t = rq[0].a;
        else t = g[g.length - 1].e;
        const M = new ganttChart();
        M.s = t;
        M.id = rq[0].id;
        t += rq[0].b;
        const y = rq.shift();
        for (; j < proces.length; j++) {
          if (proces[j].arrivalTime <= t) {
            console.log( proces[j].id+" : "+ (t - proces[j].arrivalTime +  proces[j].burstTime)/ proces[j].burstTime);
            rq.push(
              new ready_queue(
                  proces[j].id,
                  proces[j].arrivalTime,
                  proces[j].burstTime,
                  1
              )
            );
        }
        else break;
      }
      if (j < proces.length && rq.length == 0) {
        rq.push(
            new ready_queue(
                proces[j].id,
                proces[j].arrivalTime,
                proces[j].burstTime,
                1
            )
          );
      j++;
      for (; j < proces.length; j++) {
        if (rq[0].a == proces[j].arrivalTime)
        rq.push(
            new ready_queue(
                proces[j].id,
                proces[j].arrivalTime,
                proces[j].burstTime,
                1
            )
          );
        else break;
      }
    }
    for(let k = 0;k<rq.length;k++){
      rq[k].rr =   (t -  rq[k].a +   rq[k].b) /  rq[k].b;
    }
    rq.sort((m, n) => {
      if(m.rr == n.rr) {
        if (m.a == n.a) return m.id - n.id;
        return m.a - n.a;
      }
      return  n.rr - m.rr ; 
    });
        M.e = t;
        g.push(M);
      }
      proces.sort((a, b) => a.name - b.name);
      let tableHtml = "",gant = "";
      let Atat = 0,Awt = 0;
      const gn = document.getElementById("gantt-chart");
      for(let i = 0;i<g.length;i++){
        gant += `
            <tr>
            <td>${'P'+g[i].id}</td>
            <td>${g[i].s}</td>
            <td>${g[i].e}</td>
            </tr>
        `;
      }
      gn.getElementsByTagName("tbody")[0].innerHTML = gant;
      for (let i = 0; i < proces.length; i++) {
        for (let k = 0; k < g.length; k++) {
          if (proces[i].id == g[k].id) t = g[k].e;
        }
        Atat += t - proces[i].arrivalTime;
        Awt += t - proces[i].arrivalTime - proces[i].burstTime;
        tableHtml += `<tr>
        <td>${'P'+proces[i].id}</td>
        <td>${proces[i].arrivalTime}</td>
        <td>${proces[i].burstTime}</td>
        <td>${t}</td>
        <td>${t - proces[i].arrivalTime}</td>
        <td>${t - proces[i].arrivalTime - proces[i].burstTime}</td>
      </tr>`;
      }
      Atat /= proces.length;
      Awt /= proces.length;
      const resultTable = document.getElementById("result-table");
      resultTable.getElementsByTagName("tbody")[0].innerHTML = tableHtml;
      document.getElementById("avg-wt").innerHTML = Awt.toFixed(2)+" units";
      document.getElementById("avg-tat").innerHTML = Atat.toFixed(2)+" units";
      var messageElement = document.getElementById("interrupt");
		  messageElement.innerHTML = "Processes Scheduled";
    }
    else{
      var messageElement = document.getElementById("interrupt");
		  messageElement.innerHTML = "Invalid input";
    }
   
});
// var inputField = document.getElementById("input-field");
// 		var messageElement = document.getElementById("message");
		
// 		inputField.addEventListener("click", function() {
// 			messageElement.classList.add("hide");
// 		});