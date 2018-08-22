
export const createContent = (marker, place, data) => {
	const placeSection =
	`<div class="infoWindow" tabIndex="3">
		<div name=${marker.title}>
			<h3>${place.name}</h3>
			<div class="info_db">
				<div class="column">
					<div class="place_address">
						<i class="fas fa-location-arrow"></i>
						<span>${place.postcode} ${place.town} ${place.address}</span>
					</div>
					<div class="place_contacts">
						<i class="fas fa-phone"></i>
						${place.phones.map(phone => {
							return '<span><a href="tel:' + phone + '\">' + phone + '</a></span>';
						}).join(", ")}
					</div>
					<div class="place_hours">
						<i class="far fa-clock"></i>
						<span>${place.available[0].hours}</span>
					</div>
				</div>
				<div class="column">
					<div class="place_type">
					${place.type.map(type => {
						return `<div class="place_type_label">${type}</div>`;
					}).join(" ")}
					</div>
					<div class="place_available">
					${place.available.map(av => {
						console.log('av => ',av);
						return `<div class="place_available_item">
							<div class="place_age">${av.age}</div>
							${place.meals ?
							'<div class="place_meals">' +
								'<div class="tooltip">' +
									'<i class="fas fa-utensils meals_true"></i>' +
									'<span class="tooltiptext">Meals provided</span>' +
								'</div>' +
							'</div>' :
							'<div class="place_meals">' +
								'<div class="tooltip">' +
									'<i class="fas fa-utensils meals_false"></i>' +
									'<span class="tooltiptext">No meals</span>' +
								'</div>' +
							'</div>'
							}
							<div class="place_availability">
								<div class="tooltip">
									<i class="fas fa-user-alt"></i>
									<span class="Place_availability__number">${av.vacancies}</span>
									<span class="tooltiptext">${av.vacancies} places available</span>
								</div>
							</div>
						</div>`
						})}
					</div>
				</div>
			</div>`

	const separator = data.hasData ?
		`<div class="separator"><span>Information from <a href="${data.link}">Facebook Page</a></span></div>` :
		`<div class="separator">This place has no Facebook Page yet</div>`;

	//Facebook data section elements - check if data exists
	let dataSection = "";
	if (data.hasData) {
		const dataDescription = data.description && data.description.length > 0 ?
			`<div class="fb_description">${data.description}</div>` : '';

		const dataRating = data.overall_star_rating && data.rating_count ?
			`<div class="fb_rating">
				<i class="fas fa-star-half-alt"></i>
				<span class="fb_rating__number">${data.overall_star_rating}/5</span>
				<p>based on ${data.rating_count} reviews</p>
			</div>` : '';

		const dataLikes = data.engagement.count ?
			`<div class="fb_likes">
				<i class="far fa-thumbs-up"></i>
				<span class="fb_likes__number">${data.engagement.count}</span>
				<p>people like this</p>
			</div>` : '';

		const dataCover = data.cover ?
			`<div class="fb_cover">
				<img class="fb_cover__image" src="${data.cover.source}" alt="${place.name}">
			</div>` : '';

		dataSection = `<div class="info_fb">
			${dataDescription}
			${dataRating}
			${dataLikes}
		</div>
		${dataCover}`
	}
	return `${placeSection}${separator}${dataSection}`;
}