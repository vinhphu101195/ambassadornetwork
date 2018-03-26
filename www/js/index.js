let articleDiv = document.getElementById("article");
let articleSubDiv = document.getElementById("article__sub");

const showCardPost = (root) => {
	let article = ``,
		articleHeading = ``,
		articleDate = ``,
		articleImage = ``,
		articleData;
	let firebaseData = firebase.database().ref();
	firebaseData.once('value', data => {
		let dataValue = data.val();
		if (dataValue["data"]) {
			let arrData = dataValue.data,
				arrPost = [];
			Object.keys(arrData).forEach(id => {
				console.log(arrData[id].post);
				
				Object.keys(arrData[id].post).forEach(idPost => {
					arrData[id].post[idPost].id = idPost;
					arrPost.push(arrData[id].post[idPost]);
				});
			});

			// Sort post from newest
			arrPost.sort((a, b) => {
				if (`${a.date.day} ${a.date.time}` === `${b.date.day} ${b.date.time}`) return 0;
				return (`${a.date.day} ${a.date.time}` < `${b.date.day} ${b.date.time}`) ? 1 : -1;
			});
			// Adding data to JSX
			articleHeading = `${arrPost[0].heading}`;
			articleImage = `${arrPost[0].image}`;
			articleDate = `${arrPost[0].date.day} ${arrPost[0].date.time}`;
			article = `
							<img src=${ articleImage} id="big-picture">
							<!-- chen link vao day -->
							<br>
							<div class="word">
								<h2>
									<a href=${ arrPost[0].id} class="onPopup title"> ${articleHeading}</a>
								</h2>
								<!-- time -->
								<p>Posted: ${ articleDate}</p>
								<!-- chen link vao day, cung link -->
								<a href=${arrPost[0].id} class="onPopup link_a">Read more</a>
							</div>`
			// Fill data to html
			articleDiv.innerHTML = article;
			article = ``;
			arrPost.splice(0, 1);

			// Sub post
			let arrSubPost = []
			arrPost.forEach((ele, index) => {
				articleHeading = `${ele.heading}`;
				articleImage = `${ele.image}`;
				articleDate = `${ele.date.day} ${ele.date.time}`;
				article = `
					<div class="box-small col span-1-of-2">
					<div class="article-small__wrapper">
						<div class="article-small">
							<img class="small-picture" src=${articleImage}>
							<div class="word">
								<h4>
									<a href=${ ele.id} class="onPopup title">${articleHeading}</a>
								</h4>
								<!-- time -->
								<p>Posted: ${ articleDate}</p>
								<!-- chen link vao day, cung link -->
								<a href=${ele.id} class="onPopup link_a">Read more</a>
							</div>
						</div>
						</div>
					</div>
				`;
				arrSubPost.push(article);
			});
			for (let i = 0; i < arrSubPost.length; i++) {
				articleSubDiv.innerHTML += `	
					<div class="row1">
						${ arrSubPost[i] ? arrSubPost[i] : ""}
						${ arrSubPost[i + 1] ? arrSubPost[i + 1] : ""} 
					</div>
				`
				i++;
			}
			article = ``;

			// Add event
			addEventPopup();
		}
	});
}
showCardPost();

// Popup 
let popup = document.getElementById("popup");
let popupPicture = document.getElementById("popup__picture");
let popupHeading = document.getElementById("popup__heading");
let popupContent = document.getElementById("popup__content");
let onPopup = document.getElementsByClassName("onPopup");
let popupClose = document.getElementById("popup__close");

const addEventPopup = () => {
	for (let i = 0; i < onPopup.length; i++) {
		onPopup[i].addEventListener("click", (e) => {
			e.preventDefault();
			let id = onPopup[i].getAttribute("href");
			let firebaseData = firebase.database().ref("/post");
			firebaseData.once('value', data => {
				let dataValue = data.val();
				if (dataValue) {
					Object.keys(dataValue).forEach(ele => {
						if (ele === id) {
							popupHeading.innerHTML = dataValue[ele].heading;
							popupContent.innerHTML = dataValue[ele].content;

							popup.style.zIndex = 1000;
							setTimeout(() => {
								popup.style.opacity = 1;
							}, 100);
						}
					});
					// dataValue.forEach(ele => {
					// 	console.log(ele);
					// if (ele.id === id) {


				}
			});
		});
	}
}
popupClose.addEventListener("click", e => {
	popup.style.opacity = -0;
	setTimeout(() => {
		popup.style.zIndex = -1000;
	}, 100);
});

// News
let newsHeading = document.getElementById("news__heading");
let newsContent = document.getElementById("news__content");
let newsFooter = document.getElementById("news__footer");
const showNews = (root) => {
	let firebaseData = firebase.database().ref();
	firebaseData.once('value', data => {
		let dataValue = data.val();
		if (dataValue["data"]) {
		}
	});
}

// Get a database reference to our posts
// var db = firebase.database();
// let ref = db.ref("/");

// // Attach an asynchronous callback to read the data at our posts reference
// // ref.on("value", function(snapshot) {
// //   console.log(snapshot.val());
// // }, function (errorObject) {
// //   console.log("The read failed: " + errorObject.code);
// // });

// ref.orderByChild("-L8RzM5VIAhhjRmO2Kg5").on("value", function(snapshot) {
//   console.log(snapshot.val());
// });