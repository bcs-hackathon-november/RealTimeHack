Meteor.startup(function () {
	if (Rooms.find().count() === 0) {
		Rooms.insert({
			user: [],
			title: "Room 1",
			haiku: {
				title: "Title Test 1",
				line_1: "",
				line_2: "",
				line_3: "",
				line_1_counter: 0,
				line_2_counter: 0,
				line_3_counter: 0,
				created_at: new Date()
			}
		});
		Rooms.insert({
			user: [],
			title: "Room 2",
			haiku: {
				title: "",
				line_1: "",
				line_2: "",
				line_3: "",
				line_1_counter: 0,
				line_2_counter: 0,
				line_3_counter: 0,
				created_at: new Date()
			}
		});
		Rooms.insert({
			user: [],
			title: "Room 3",
			haiku: {
				title: "",
				line_1: "",
				line_2: "",
				line_3: "",
				line_1_counter: 0,
				line_2_counter: 0,
				line_3_counter: 0,
				created_at: new Date()
			}
		});
	}
});