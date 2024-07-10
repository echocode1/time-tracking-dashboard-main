fetch('./data.json')
.then(request => {
    if(!request){
        throw new error('Network request is not ok' + request.textStatus)
    }
    return request.json();
})

//using the data fetched from json
.then((data) => {
    function sectionTitle(data){
        data.forEach((item, index) =>{
            const section =  document.getElementById(`text-section${index + 1}`);
            if(section){

                //all my html code goes in through this other
                section.innerHTML = 
                `
                 <div class = 'activity-schedule'>
                    <p class = "activity-title">${item.title}</p>
                    <p class= 'bar-icon'>•••</p>
                 </div>
                
                 <div class = 'activity-timing'>
                   <div class = "daily-timing">
                    <p class = "current-timing">${
                        item.timeframes.daily.current === 0 ?'0' 
                        :item.timeframes.daily.current === 1 ? `${item.timeframes.daily.current}hr`
                        :`${item.timeframes.daily.current}hrs`
                        }
                    </p>
                    <p class= 'light-text'>Yesterday - ${
                        item.timeframes.daily.previous > 1
                        ? `${item.timeframes.daily.previous}hrs` 
                        : `${item.timeframes.daily.previous}hr`
                        }
                    </p>
                   </div>
                   <div class = "weekly-timing">
                    <p class = "current-timing">${item.timeframes.weekly.current}hrs</p>
                    <p class= 'light-text'>Last week - ${item.timeframes.weekly.previous}hrs</p>
                   </div>
                   <div class = "monthly-timing">
                    <p class = "current-timing">${item.timeframes.monthly.current}hrs</p>
                    <p class= 'light-text'>Last month - ${item.timeframes.monthly.previous}hrs</p>
                   </div>
                 </div> 
                `
            }
        })
    }
    //eventlister for the interactive button goes here;
    sectionTitle(data);
    let daily = document.querySelectorAll('.daily-timing');
    let weekly = document.querySelectorAll('.weekly-timing');
    let monthly = document.querySelectorAll('.monthly-timing');

    const dailyBtn = document.getElementById('daily-intervals')
    const weeklyBtn = document.getElementById('weekly-intervals')
    const monthlyBtn = document.getElementById('monthly-intervals')
    dailyBtn.onclick = ()=>{
        daily.forEach(el => el.style.display = 'flex');
        weekly.forEach(el => el.style.display = 'none');
        monthly.forEach(el => el.style.display = 'none');
        dailyBtn.style.color = 'white'
        weeklyBtn.style.color = ''
        monthlyBtn.style.color = ''
    }
    weeklyBtn.onclick = () => {
        daily.forEach(el => el.style.display = 'none');
        weekly.forEach(el => el.style.display = 'flex');
        monthly.forEach(el => el.style.display = 'none');
        dailyBtn.style.color = '';
        weeklyBtn.style.color = 'white';
        monthlyBtn.style.color = '';
    }
    monthlyBtn.onclick =() => {
        daily.forEach(el => el.style.display = 'none');
        weekly.forEach(el => el.style.display = 'none');
        monthly.forEach(el => el.style.display = 'flex');
        dailyBtn.style.color = ''
        weeklyBtn.style.color = ''
        monthlyBtn.style.color = 'white'
    }

}) 
.catch(error => {
    console.error('Fetch error', error);
})