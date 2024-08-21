document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('event-form');
    const eventsList = document.getElementById('events-list');

    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const eventName = document.getElementById('event-name').value;
        const eventDate = new Date(document.getElementById('event-date').value);
        
        if (eventName && eventDate) {
            addEvent(eventName, eventDate);
            eventForm.reset();
        }
    });

    function addEvent(name, date) {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');

        const eventNameElement = document.createElement('span');
        eventNameElement.classList.add('event-name');
        eventNameElement.textContent = name;

        const countdownElement = document.createElement('span');
        countdownElement.classList.add('countdown');

        eventElement.appendChild(eventNameElement);
        eventElement.appendChild(countdownElement);

        eventsList.appendChild(eventElement);

        updateCountdown(countdownElement, date);

        setInterval(function() {
            updateCountdown(countdownElement, date);
        }, 1000);
    }

    function updateCountdown(element, date) {
        const now = new Date();
        const timeLeft = date - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            element.textContent = "Event has passed";
        }
    }
});
