const classChanges = [
	{
		time: 76,
		type: 'notification',
		title: 'Domain',
		message: 'Just listed nearby: A home in your budget just came on the market',
	},
	{
		time: 85,
		type: 'notification',
		title: 'Calvin Klein',
		message: 'Back in stock: Modern Cotton Briefs — 25% off until Sunday.',
	},
	{
		time: 87,
		type: 'notification',
		title: 'Toyota',
		message:
			'RECALL ALERT - A safety recall applies to your vehicle. Schedule a service at your nearest dealership.',
	},
	{
		time: 88,
		type: 'notification',
		title: 'Bupa Dental',
		message:
			'Overdue check-up - You’re due for a dental clean. Book an appointment at your usual clinic',
	},

	// Stacy
	{
		time: 242,
		type: 'notification',
		title: 'ABC Mental Health Centre',
		message: 'Sliding Fee Scale Discount Program Available',
	},
	{ time: 254, type: 'notification', title: 'LinkedIn', message: 'You have 6 new jobs' },
	{ time: 254.25, type: 'notification', title: 'LinkedIn', message: 'You have 15 new jobs' },
	{ time: 254.5, type: 'notification', title: 'LinkedIn', message: 'You have 23 new jobs' },
	{ time: 254.75, type: 'notification', title: 'LinkedIn', message: 'You have 30 new jobs' },
	{ time: 255, type: 'notification', title: 'Seek', message: 'You have 7 new jobs' },
	{ time: 255.25, type: 'notification', title: 'Seek', message: 'You have 20 new jobs' },
	{ time: 255.5, type: 'notification', title: 'Seek', message: 'You have 25 new jobs' },
	{ time: 255.75, type: 'notification', title: 'Seek', message: 'You have 42 new jobs' },

	// Bob
	{
		time: 307,
		type: 'notification',
		title: 'Reddit',
		message: 'New posts in r/AskGayBros: “How did you come out?”',
	},
	{
		time: 307.25,
		type: 'notification',
		title: 'Reddit',
		message: 'Popular in r/LGBT: “Affirming churches that actually affirm”',
	},
	{
		time: 307.5,
		type: 'notification',
		title: 'Medium',
		message: 'Recommended for you: “Coming Out in a Conservative Church: My Story”',
	},
	{
		time: 307.75,
		type: 'notification',
		title: 'Medium',
		message: 'Recommended for you: “Affirming Theology: God Has the Final Say”',
	},
	{
		time: 308,
		type: 'notification',
		title: 'The Guardian',
		message: 'Feature: “Queer faith: How churches are redefining inclusivity”',
	},
	{
		time: 308.25,
		type: 'notification',
		title: 'BetterHelp',
		message: 'Explore: “How to navigate big career shifts with less stress”',
	},

	{
		time: 319,
		type: 'notification',
		title: 'Reddit',
		message: 'Trending in r/offmychest: “I think I saw my pastor on Craigslist M4M',
	},
	{
		time: 319.5,
		type: 'notification',
		title: 'Facebook',
		message: 'A mutual friend just joined “Discreet Dads of Missouri”',
	},
	{
		time: 320,
		type: 'notification',
		title: 'Craigslist',
		message: 'New ad near you: “Looking for someone who understands discretion… and sermons”',
	},

	// Bethany

	{
		time: 347,
		type: 'notification',
		title: 'Headspace',
		message: 'Therapy-friendly clinics near you — open now, no appointment needed',
	},
	{
		time: 347.25,
		type: 'notification',
		title: 'Headspace',
		message: 'New today: “Feeling depressed? How to notice the signs early”',
	},
	{
		time: 349,
		type: 'notification',
		title: 'Google Maps',
		message: 'Route updated: You’re now passing by WellSpring Mental Health',
	},
	{
		time: 349.5,
		type: 'notification',
		title: 'Google Maps',
		message: 'Still open: Counseling Services, 400m ahead',
	},

	{ time: 46, target: '.video-overlay-1', add: 'active' },
	{ time: 53, target: '.video-overlay-1', remove: 'active' },
	{ time: 138, target: '.video-overlay-2', add: 'active' },
	{ time: 145, target: '.video-overlay-2', remove: 'active' },
	{ time: 235, target: '.video-overlay-3', add: 'active' },
	{ time: 241, target: '.video-overlay-3', remove: 'active' },
	{ time: 280.5, target: '.video-overlay-4', add: 'active' },
	{ time: 282, target: '.video-overlay-4', remove: 'active' },
	{ time: 301, target: '.video-overlay-5', add: 'active' },
	{ time: 306, target: '.video-overlay-5', remove: 'active' },
	{ time: 321, target: '.video-overlay-6', add: 'active' },
	{ time: 324, target: '.video-overlay-6', remove: 'active' },
	{ time: 380, target: '.video-overlay-7', add: 'active' },
	{ time: 382, target: '.video-overlay-7', remove: 'active' },
	{ time: 399, target: '.video-overlay-8', add: 'active' },
	{ time: 405, target: '.video-overlay-8', remove: 'active' },
	{ time: 418, target: '.video-overlay-9', add: 'active' },
	{ time: 425, target: '.video-overlay-9', remove: 'active' },
	{ time: 456, target: '.video-overlay-10', add: 'active' },
	{ time: 458, target: '.video-overlay-10', remove: 'active' },

	{ time: 214, target: '.experiment-text1', add: 'active' },
	{ time: 215, target: '.experiment-text1', remove: 'active' },
	{ time: 283, target: '.experiment-text2', add: 'active' },
	{ time: 284, target: '.experiment-text2', remove: 'active' },
	{ time: 325, target: '.experiment-text2', add: 'active' },
	{ time: 326, target: '.experiment-text2', remove: 'active' },
	{ time: 44, target: '.cat-text', add: 'active' },
	{ time: 45, target: '.cat-text', remove: 'active' },
	{ time: 98, target: '.cat-text', add: 'active' },
	{ time: 99, target: '.cat-text', remove: 'active' },
	{ time: 217, target: '.cat-text', add: 'active' },
	{ time: 218, target: '.cat-text', remove: 'active' },
	{ time: 459, target: '.cat-text', add: 'active' },
	{ time: 460, target: '.cat-text', remove: 'active' },
]
