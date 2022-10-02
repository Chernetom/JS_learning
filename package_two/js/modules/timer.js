function timer (id, deadline) {
    //timer
    function getDataTimer(endtime){
        const timer = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(timer / (1000 * 60 * 60 * 24)),
                hours = Math.floor((timer / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((timer / (1000 * 60) % 60)),
                seconds = Math.floor((timer / 1000) % 60);
        return {
            'total': timer,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if(num > 0 && num < 10){
            return `0${num}`;
        }else {
            return num;
        }
    }

    function setDataTimer(selector, endtime){
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateDataTimer, 1000);
        
        updateDataTimer();

        function updateDataTimer(){
            const timer = getDataTimer(endtime);

            days.innerHTML = getZero(timer.days);
            hours.innerHTML = getZero(timer.hours);
            minutes.innerHTML = getZero(timer.minutes);
            seconds.innerHTML = getZero(timer.seconds);

            if (timer.total <= 0){
                clearInterval( timeInterval);
            }

        }
    }

    setDataTimer(id, deadline);
}

export default timer;