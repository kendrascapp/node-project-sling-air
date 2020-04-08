const flightInput = document.getElementById("flight");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");

let selection = "";

const renderSeats = data => {
  document.querySelector(".form-container").style.display = "block";
  const alpha = ["A", "B", "C", "D", "E", "F"];
  for (let r = 1; r < 11; r++) {
    const row = document.createElement("ol");
    row.classList.add("row");
    row.classList.add("fuselage");
    seatsDiv.appendChild(row);
    for (let s = 1; s < 7; s++) {
      const seatNumber = `${r}${alpha[s - 1]}`;
      const seat = document.createElement("li");
      const realSeat = data.find(item => item.id === seatNumber);
      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;
      seat.innerHTML = realSeat.isAvailable ? seatAvailable : seatOccupied;
      row.appendChild(seat);
    }
  }

  let seatMap = document.forms["seats"].elements["seat"];
  seatMap.forEach(seat => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach(x => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove("selected");
        }
      });
      document.getElementById(seat.value).classList.add("selected");
      document.getElementById("seat-number").innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};

//this is the work I did
const toggleFormContent = event => {
  const flightNumber = flightInput.value;
  console.log("toggleFormContent: ", flightNumber);

  fetch(`/correctFlight/${flightNumber}`)
    .then(res => res.json())
    .then(data => {
      renderSeats(data);
    });
  // TODO: contact the server to get the seating availability
  //      - only contact the server if the flight number is this format 'SA###'.
  //      - Do I need to create an error message if the number is not valid?

  // TODO: Pass the response data to renderSeats to create the appropriate seat-type.
};

////// get the confirm flight page here
const handleConfirmSeat = event => {
  event.preventDefault();
  window.location.href = "confirmed.html";
};

flightInput.addEventListener("blur", toggleFormContent);

//     '/confirmed?flightnum=' + flightnum + '&username=' + username + '&lastname=' + lastname + '&email=' + email
// TODO: everything in here!
// window.alert("Handle clicked!")
