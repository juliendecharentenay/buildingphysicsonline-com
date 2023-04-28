/*
 * BenchmarkingJS
 * Copyright 2018, Julien de Charentenay
 *
 * Licensed under MIT license
 *
 * v x.x
 */

var BenchmarkingJS = BenchmarkingJS || {};
BenchmarkingJS.CibseTM46 = {};

BenchmarkingJS.CibseTM46.makeGFA = function(isPrimary, factor) {
	return {
		'id' : 'GFA',
		'shortname': 'GFA',
		'name' : 'Gross floor area measured as RICS gross internal area (GIA)',
		'unit': 'm2',
		'isPrimary' : isPrimary,
		'toPrimary' : function(v) { return factor*v; },
		'fromPrimary' : function(v) { return v/factor; }
	};
};

BenchmarkingJS.CibseTM46.makeNLA = function(isPrimary, factor) {
     return {
	  'id' : 'NLA',
      'shortname': 'NLA',
	  'name' : 'Net lettable area (NLA) measured as RICS',
	  'unit': 'm2',
	  'isPrimary' : isPrimary,
	  'toPrimary' : function(v) { return factor * v; },
	  'fromPrimary' : function(v) { return v / factor; }
	};
};

BenchmarkingJS.CibseTM46.makeSFA = function(isPrimary, factor) {
  return {'id' : 'SFA',
	'shortname': 'SFA',
	'name' : 'Sales floor area (SFA)',
	'unit': 'm2',
	'isPrimary' : isPrimary,
	'toPrimary' : function(v) { return factor*v; },
	'fromPrimary' : function(v) { return v/factor; }
  };
};

BenchmarkingJS.CibseTM46.makeElectricity = function(factor) {
  return {
    'id' : 'electricity', 
    'name' : 'Electricity',
    'unit' : 'kWh', 
    'value' : function(a) { return factor * a; },
    'adjustment': {
      'degreedays': 0.00,
      'occupancy': 0.00
     }
  };
};

BenchmarkingJS.CibseTM46.makeNaturalGas = function(factor) {
  return {
    'id' : 'naturalGas', 
    'name' : 'Natural gas',
    'unit' : 'kWh', 
    'value' : function(a) { return factor * a; },
    'adjustment': {
      'degreedays': 0.00,
      'occupancy': 0.00
     }
  };
};


BenchmarkingJS.CibseTM46.HeatingDegreeDays = {
    'Reference': 2021,
    'Thames Valley': 1709,
    'South Eastern': 2021,
    'Southern': 1921,
    'South Western': 1666,
    'Severn Valley': 1780,
    'Midland': 2080,
    'West Pennines': 2037,
    'North Western': 2289,
    'Borders': 2257,
    'North Eastern': 2237,
    'East Pennines': 2069,
    'East Anglia': 2094,
    'Wales': 1970,
    'Northern Ireland': 2168
};

BenchmarkingJS.CibseTM46.Benchmarks = {};
BenchmarkingJS.CibseTM46.Benchmarks.Category = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy = {};
BenchmarkingJS.CibseTM46.Benchmarks.Metrics = {};
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy = {};

BenchmarkingJS.CibseTM46.Benchmarks.Category['generalOffice'] = {
		'key' : 1,
		'name' : 'General office',
		'description' : 'General office and commercial working areas',
		'usage' : 'Mainly by employees, for sedentary desk based activities. Includes meeting and conference facilities',
		'schedule' : 'Weekdays and early evenings',
		'features' : 'Relative uniformity of occupancy, density, condtions, schedule and appliances',
		'services' : 'Heating, lighting, cooling, employee appliances, standard IT, basic tea room',
		'mixeduse' : 'Covered car park, staff restaurant',
		'specialenergy' : 'Regional server rom, trading floor',
		'representative' : 'General office benchmark category for all offices whether air conditioner or not, Town Halls, architects, various business services that do not include retail functions' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalOffice'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalOffice']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(95.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalOffice']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalOffice']['electricity']['adjustment']['occupancy'] = 1.07;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalOffice']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(120.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalOffice']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalOffice']['naturalGas']['adjustment']['occupancy'] = 0.44;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['generalOffice'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['generalOffice']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['generalOffice']['NLA'] = BenchmarkingJS.CibseTM46.makeNLA(true, 1.25);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['generalOffice'] = {
	'definition': 'Number of hours when the recorded number of occupants exceeds 25% of the nominal maximum number',
	'reference': 2040,
	'maximum': 8760 };

BenchmarkingJS.CibseTM46.Benchmarks.Category['highStreetAgency'] = {
		'key' : 2,
		'name' : 'High street agency',
		'description' : 'High street agency',
		'usage' : 'By employees mainly for desk based activities and off street visitors - public area and back office',
		'schedule' : 'Weekdays and early evenings, commonly part or all of weekend',
		'features' : 'Office type of activities,with retail street frontage, and consequent infiltration and glazing losses',
		'services' : 'Heating, lighting, cooling, employee appliances, standard IT, basic tea room',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'Bank branches, estate agents, travel agents, legal, insurance and advertising services, off-street professional services, Post Offices, betting shops' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['highStreetAgency'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['highStreetAgency']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(140.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['highStreetAgency']['electricity']['adjustment']['degreedays'] = 0.20;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['highStreetAgency']['electricity']['adjustment']['occupancy'] = 0.22;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['highStreetAgency']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(0.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['highStreetAgency']['naturalGas']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['highStreetAgency']['naturalGas']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['highStreetAgency'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['highStreetAgency']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['highStreetAgency'] = {
         'definition': 'Number of hours when the premises are fully open to customers according to published hours',
         'reference': 2448,
         'maximum': 3672 };

BenchmarkingJS.CibseTM46.Benchmarks.Category['generalRetail'] = {
		'key' : 3,
		'name' : 'General retail',
		'description' : 'General street retail and services',
		'usage' : 'Mainly by clients, customers and visitors for a service activity - some facilities required for employees',
		'schedule' : 'Weekdays and early evenings, commonly part of all of weekend',
		'features' : 'Basic heating, lighting, cooling for off street premises that may contain a wide variety of activities besides sale of goods',
		'services' : 'Heating, lighting, cooling, appliances for small number of employees',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'High street store or local stores. Corner shops, amusement arcades, takeaways, hairdressers, laundries, laundettes, dry cleaners, hire premises, indoor markets' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalRetail'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalRetail']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(165.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalRetail']['electricity']['adjustment']['degreedays'] = 0.15;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalRetail']['electricity']['adjustment']['occupancy'] = 0.22;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalRetail']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(0.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalRetail']['naturalGas']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalRetail']['naturalGas']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['generalRetail'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['generalRetail']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['generalRetail']['SFA'] = BenchmarkingJS.CibseTM46.makeSFA(false, 1.80);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['generalRetail'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 2448,
  'maximum': 3672 };

BenchmarkingJS.CibseTM46.Benchmarks.Category['largeNonFoodShop'] = {
		'key' : 4,
		'name' : 'Large non-food shop',
		'description' : 'Retail warehouse or other large non-food store',
		'usage' : 'Mainly by customers for purchasin goods - some facilities required for employees',
		'schedule' : 'Typically week and weekend days',
		'features' : 'Large and tends to be solely used for retailing',
		'services' : 'Heating, lighting, cooling, appliances for small number of employees',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'Retail warehouses or shed, department stores, hypermarkets, large showrooms' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeNonFoodShop'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeNonFoodShop']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(70.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeNonFoodShop']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeNonFoodShop']['electricity']['adjustment']['occupancy'] = 0.32;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeNonFoodShop']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(170.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeNonFoodShop']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeNonFoodShop']['naturalGas']['adjustment']['occupancy'] = 0.15;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['largeNonFoodShop'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['largeNonFoodShop']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['largeNonFoodShop']['SFA'] = BenchmarkingJS.CibseTM46.makeSFA(false, 1.80);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['largeNonFoodShop'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 2448,
  'maximum': 4284 };

BenchmarkingJS.CibseTM46.Benchmarks.Category['smallFoodStore'] = {
		'key' : 5,
		'name' : 'Small food store',
		'description' : 'Small food store',
		'usage' : 'Mainly by customers for purchasing goods - some facilities required for employees',
		'schedule' : 'Typically week and weekend days',
		'features' : 'Greater needs for refrigeration of goods than other shops',
		'services' : 'Heating, lighting, display cabinets, food storage, employee appliances',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'Food stores, green groces, fish shops, butcers, delicatessens' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['smallFoodStore'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['smallFoodStore']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(310.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['smallFoodStore']['electricity']['adjustment']['degreedays'] = 0.15;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['smallFoodStore']['electricity']['adjustment']['occupancy'] = 0.22;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['smallFoodStore']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(0.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['smallFoodStore']['naturalGas']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['smallFoodStore']['naturalGas']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['smallFoodStore'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['smallFoodStore']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['smallFoodStore']['SFA'] = BenchmarkingJS.CibseTM46.makeSFA(false, 1.35);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['smallFoodStore'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 2448,
  'maximum': 3672 };

BenchmarkingJS.CibseTM46.Benchmarks.Category['largeFoodStore'] = {
		'key' : 6,
		'name' : 'Large food store',
		'description' : 'Supermarket or other large food store',
		'usage' : 'Mainly by customers for purchasing goods - some facilities required for employees',
		'schedule' : 'Typically week and weekend days; may be used in evenings; some are 24/7 operations',
		'features' : 'Greater needs for refrigeration of goods, and larger, than other shops',
		'services' : 'Heating, lighting, display cabinets, food storage, employee appliances',
		'mixeduse' : 'Covered car park',
		'specialenergy' : 'Bakery oven',
		'representative' : 'Supermarkets and freezer centres' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeFoodStore'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeFoodStore']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(400.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeFoodStore']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeFoodStore']['electricity']['adjustment']['occupancy'] = 0.20;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeFoodStore']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(105.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeFoodStore']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['largeFoodStore']['naturalGas']['adjustment']['occupancy'] = 0.09;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['largeFoodStore'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['largeFoodStore']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['largeFoodStore']['SFA'] = BenchmarkingJS.CibseTM46.makeSFA(false, 2.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['largeFoodStore'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 2983,
  'maximum': 4284 };

BenchmarkingJS.CibseTM46.Benchmarks.Category['restaurant'] = {
		'key' : 7,
		'name' : 'Restaurant',
		'description' : 'Restaurant',
		'usage' : 'Storage and preparation of food which is then cooked and served to users; seating space for eating is provided',
		'schedule' : 'There is wide variety of operational schedules, from selected portions of weekdays to 24/7 operation',
		'features' : 'Assumes minimal reheat of food',
		'services' : 'Heating, lighting, cooling, food storage, heating of pre-prepared food',
		'mixeduse' : null,
		'specialenergy' : 'Cooking equipment in a catering kitchen',
		'representative' : 'Cafes, restaurants, canteens, refectories, mess halls' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['restaurant'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['restaurant']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(90.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['restaurant']['electricity']['adjustment']['degreedays'] = 0.20;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['restaurant']['electricity']['adjustment']['occupancy'] = 0.37;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['restaurant']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(370.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['restaurant']['naturalGas']['adjustment']['degreedays'] = 0.30;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['restaurant']['naturalGas']['adjustment']['occupancy'] = 0.17;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['restaurant'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['restaurant']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['restaurant'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 3060,
  'maximum': 5712 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['barPubLicensedClub'] = {
		'key' : 8,
		'name' : 'Bar, pub or licensed club',
		'description' : 'Bar, pub or club',
		'usage' : 'Serving drinks and snacks, with standing and sitting areas for customers',
		'schedule' : 'Open to public or members, day and evening',
		'features' : 'Major activity is the bar and associated areas',
		'services' : 'Heating, lighting, cooling, some office appliances, snack provision',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'Pubs, licensed clubs, members clibs, wine bars' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['barPubLicensedClub'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['barPubLicensedClub']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(130.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['barPubLicensedClub']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['barPubLicensedClub']['electricity']['adjustment']['occupancy'] = 0.37;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['barPubLicensedClub']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(350.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['barPubLicensedClub']['naturalGas']['adjustment']['degreedays'] = 0.40;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['barPubLicensedClub']['naturalGas']['adjustment']['occupancy'] = 0.17;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['barPubLicensedClub'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['barPubLicensedClub']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['barPubLicensedClub'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 3060,
  'maximum': 5712 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['hotel'] = {
		'key' : 9,
		'name' : 'Hotel',
		'description' : 'Hotel or boarding house',
		'usage' : 'Primarily the provision of short term accommodation and hygiene facilities',
		'schedule' : 'Primarily used in evenings',
		'features' : 'Provision for paid short term accommodation',
		'services' : 'Heating, lighting, cooling, some office appliances, laundry services',
		'mixeduse' : 'Swimming pool, fitness and health centre, restaurant, general office (for conference facility)',
		'specialenergy' : null,
		'representative' : 'All hotel types, guest houses, motels' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hotel'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hotel']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(105.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hotel']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hotel']['electricity']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hotel']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(330.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hotel']['naturalGas']['adjustment']['degreedays'] = 0.45;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hotel']['naturalGas']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['hotel'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['hotel']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);

BenchmarkingJS.CibseTM46.Benchmarks.Category['culturalActivities'] = {
		'key' : 10,
		'name' : 'Cultural activities',
		'description' : 'Museum, art gallery or other public building with normal occupancy',
		'usage' : 'Spaces for displaying and viewing object, with associated office and storage facilities',
		'schedule' : 'Daytime use, similar to office hours, but more likely to be open in weekends',
		'features' : 'Activity is office like in its requirements wbut with some additional conditioning requirements for display and storage of artefacts',
		'services' : 'Heating, lighting, cooling, humidity control',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'Municipal museums, libraries and galleries, higher education arts buildings' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['culturalActivities'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['culturalActivities']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(70.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['culturalActivities']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['culturalActivities']['electricity']['adjustment']['occupancy'] = 0.45;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['culturalActivities']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(200.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['culturalActivities']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['culturalActivities']['naturalGas']['adjustment']['occupancy'] = 0.20;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['culturalActivities'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['culturalActivities']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['culturalActivities'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 2040,
  'maximum': 4284 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['entertainmentHalls'] = {
		'key' : 11,
		'name' : 'Entertainment halls',
		'description' : 'Entertainment halls',
		'usage' : 'Large assembly and seating areas, with associated ticketing and snack services, for performance events and films',
		'schedule' : 'Mainly in evenings, some daytime use. All days of week',
		'features' : 'Tend to be large halls, mainly used in evenings',
		'services' : 'Heating, lighting, cooling of main entertaiment spaces, and circulation. Ticketing and snacks provision',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'Cinemas, theatres, concert halls. Bingo halls' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['entertainmentHalls'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['entertainmentHalls']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(150.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['entertainmentHalls']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['entertainmentHalls']['electricity']['adjustment']['occupancy'] = 0.41;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['entertainmentHalls']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(420.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['entertainmentHalls']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['entertainmentHalls']['naturalGas']['adjustment']['occupancy'] = 0.19;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['entertainmentHalls'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['entertainmentHalls']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['entertainmentHalls'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 2856,
  'maximum': 5712 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['swimmingPoolCentre'] = {
		'key' : 12,
		'name' : 'Swimming pool centre',
		'description' : 'Swimming pool hall, changing and ancillaries',
		'usage' : 'Swimming pool with associated facilities',
		'schedule' : 'Ranges from occasional use to daily and evening',
		'features' : 'Pool hall is the dominant space use - may have small cafe and fitness room',
		'services' : 'Heating, lighting, cooling of all spaces. Office appliances, showers, snack provision and bar',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'Swimming pool centre without further sports facilities' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['swimmingPoolCentre'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['swimmingPoolCentre']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(245.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['swimmingPoolCentre']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['swimmingPoolCentre']['electricity']['adjustment']['occupancy'] = 0.27;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['swimmingPoolCentre']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(1130.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['swimmingPoolCentre']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['swimmingPoolCentre']['naturalGas']['adjustment']['occupancy'] = 0.13;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['swimmingPoolCentre'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['swimmingPoolCentre']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['swimmingPoolCentre'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 2856,
  'maximum': 4641 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['fitnessAndHealthCentre'] = {
		'key' : 13,
		'name' : 'Fitness and health centre',
		'description' : 'Fitness centre',
		'usage' : 'Fitness, aerobics, dance and solarium/sauna facilities',
		'schedule' : 'Typically daily and evenings',
		'features' : 'Provision of sports and entertainment equipment with generally high energy usage, and internal gains',
		'services' : 'Heating, lighting, cooling of all spaces. Office appliances, showers, snack provision and bar',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'fitness centre, health centre' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['fitnessAndHealthCentre'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['fitnessAndHealthCentre']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(160.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['fitnessAndHealthCentre']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['fitnessAndHealthCentre']['electricity']['adjustment']['occupancy'] = 0.39;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['fitnessAndHealthCentre']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(440.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['fitnessAndHealthCentre']['naturalGas']['adjustment']['degreedays'] = 0.40;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['fitnessAndHealthCentre']['naturalGas']['adjustment']['occupancy'] = 0.18;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['fitnessAndHealthCentre'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['fitnessAndHealthCentre']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['fitnessAndHealthCentre'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 2754,
  'maximum': 5355 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['drySportAndLeisureFacility'] = {
		'key' : 14,
		'name' : 'Dry sports and leisure facility',
		'description' : 'Dry sports and leisure facility',
		'usage' : 'Dry sports and club house buildings - for a combines leisure centre include pool, etc',
		'schedule' : 'Ranges from occasional use to daily and evening',
		'features' : 'Provision of space to support separated sporting and entertainment activities often lightly serviced',
		'services' : 'Heating, lighting, and basic office equipment',
		'mixeduse' : 'Swimming pool, fitness and health centre',
		'specialenergy' : 'Sports flood lighting',
		'representative' : 'Dry sports halls, sports grounds with changing rooms, tennis courts with office, speedway tracks, stadiums, pavilions' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['drySportAndLeisureFacility'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['drySportAndLeisureFacility']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(95.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['drySportAndLeisureFacility']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['drySportAndLeisureFacility']['electricity']['adjustment']['occupancy'] = 0.39;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['drySportAndLeisureFacility']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(330.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['drySportAndLeisureFacility']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['drySportAndLeisureFacility']['naturalGas']['adjustment']['occupancy'] = 0.18;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['drySportAndLeisureFacility'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['drySportAndLeisureFacility']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['drySportAndLeisureFacility'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 2754,
  'maximum': 5355 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['coveredCarPark'] = {
		'key' : 15,
		'name' : 'Covered car park',
		'description' : 'Car park with roof and side walls',
		'usage' : 'Provision for car parking and access',
		'schedule' : 'Weekday or 24-hour',
		'features' : 'Lighting and mechanical ventilation when in use',
		'services' : 'Lighting and ventilation',
		'mixeduse' : 'Office, public building in central urban location',
		'specialenergy' : null,
		'representative' : null };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coveredCarPark'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coveredCarPark']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(20.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coveredCarPark']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coveredCarPark']['electricity']['adjustment']['occupancy'] = 0.41;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coveredCarPark']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(0.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coveredCarPark']['naturalGas']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coveredCarPark']['naturalGas']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['coveredCarPark'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['coveredCarPark']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['coveredCarPark'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 4284,
  'maximum': 8568 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['publicBuildingLightUsage'] = {
		'key' : 16,
		'name' : 'Public buildings with light usage',
		'description' : 'Light use public and institutional buildings',
		'usage' : 'Variety of facilities and services provided with generally public access when in use',
		'schedule' : 'Intermittent usage',
		'features' : 'Lightly services or lightly used',
		'services' : 'Heating and lighting',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'Churches, club houses, village halls' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicBuildingLightUsage'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicBuildingLightUsage']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(20.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicBuildingLightUsage']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicBuildingLightUsage']['electricity']['adjustment']['occupancy'] = 0.34;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicBuildingLightUsage']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(105.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicBuildingLightUsage']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicBuildingLightUsage']['naturalGas']['adjustment']['occupancy'] = 0.16;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['publicBuildingLightUsage'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['publicBuildingLightUsage']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['publicBuildingLightUsage'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 2040,
  'maximum': 3672 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['schoolsAndSeasonalPublicBuildings'] = {
		'key' : 17,
		'name' : 'Schools and seasonal public buildings',
		'description' : 'Public buildings nominally used for part of the year',
		'usage' : 'Teaching and community activities',
		'schedule' : 'Wekday usage for part of the year',
		'features' : 'Public buildings with part annual occupancy',
		'services' : 'Heating, lighting and basic office equipment, teaching equipment, computers',
		'mixeduse' : 'Restaurant (dining hall), swimming pool',
		'specialenergy' : null,
		'representative' : 'Primary and secondary schools, nurseries, creches, youth centres and community centres' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['schoolsAndSeasonalPublicBuildings'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['schoolsAndSeasonalPublicBuildings']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(40.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['schoolsAndSeasonalPublicBuildings']['electricity']['adjustment']['degreedays'] = 0.00;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['schoolsAndSeasonalPublicBuildings']['electricity']['adjustment']['occupancy'] = 0.62;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['schoolsAndSeasonalPublicBuildings']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(150.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['schoolsAndSeasonalPublicBuildings']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['schoolsAndSeasonalPublicBuildings']['naturalGas']['adjustment']['occupancy'] = 0.27;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['schoolsAndSeasonalPublicBuildings'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['schoolsAndSeasonalPublicBuildings']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['schoolsAndSeasonalPublicBuildings'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 1400,
  'maximum': 3672
};

BenchmarkingJS.CibseTM46.Benchmarks.Category['universityCampus'] = {
		'key' : 18,
		'name' : 'University campus',
		'description' : 'University campus',
		'usage' : 'Lecture theatres, offices, workshops, eating places, laboratories and other activities',
		'schedule' : 'Weekdays and evenings',
		'features' : 'Large floor space and variety of activities',
		'services' : 'Heating, lighting, cooling, office and teaching equipment',
		'mixeduse' : 'Laboratory, restaurant',
		'specialenergy' : 'Furnace or forming process',
		'representative' : 'Typical campus mix for further and higher education universities and colleges' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['universityCampus'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['universityCampus']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(80.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['universityCampus']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['universityCampus']['electricity']['adjustment']['occupancy'] = 0.48;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['universityCampus']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(240.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['universityCampus']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['universityCampus']['naturalGas']['adjustment']['occupancy'] = 0.22;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['universityCampus'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['universityCampus']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['universityCampus'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 2450,
  'maximum': 5355 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['clinic'] = {
		'key' : 19,
		'name' : 'Clinic',
		'description' : 'Health centres, clinics and surgeries',
		'usage' : 'Provision of primary health care',
		'schedule' : 'Usually week days and early evenings',
		'features' : 'Daytime use, essentially office hours, but needs to provide for high public use, generally by appointment',
		'services' : 'Heating, lighting, cooling, hot water services',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'Doctors surgeries, health clinics, veterinary surgeris, dentist' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['clinic'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['clinic']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(70.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['clinic']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['clinic']['electricity']['adjustment']['occupancy'] = 0.45;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['clinic']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(200.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['clinic']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['clinic']['naturalGas']['adjustment']['occupancy'] = 0.20;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['clinic'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['clinic']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['clinic'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 2040,
  'maximum': 4284 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['hospitalClinicalandResearch'] = {
		'key' : 20,
		'name' : 'Hospital; clinical and research',
		'description' : 'Clinical and research hospital',
		'usage' : 'Mainly space for medical care with 24-hour accommodation for patients, with associated operating theatres, laboratories, offices and workshops',
		'schedule' : 'Continuous for the majority of the facility',
		'features' : '24-hour accommodation with stringent environmental conditions, ventilation control, quarantine, and high occupant servicing needs',
		'services' : 'All services',
		'mixeduse' : 'Laboratory or operating theatre, restaurant',
		'specialenergy' : 'Furnace or forming process',
		'representative' : 'Acute hospital, specialist hospital, teaching hospital and maternity hospital' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hospitalClinicalandResearch'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hospitalClinicalandResearch']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(90.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hospitalClinicalandResearch']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hospitalClinicalandResearch']['electricity']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hospitalClinicalandResearch']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(420.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hospitalClinicalandResearch']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['hospitalClinicalandResearch']['naturalGas']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['hospitalClinicalandResearch'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['hospitalClinicalandResearch']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);

BenchmarkingJS.CibseTM46.Benchmarks.Category['longTermResidential'] = {
		'key' : 21,
		'name' : 'Long term residential',
		'description' : 'Long term residential accommodation',
		'usage' : 'Full accommodation, including sleeping space, day time space, all domestic facilities, some office facilities',
		'schedule' : 'Continuous',
		'features' : '24-hour fully conditioned and services accommodation',
		'services' : 'Heating, lighting, cooling, appliances, food and hot water services, entertainment, laundry',
		'mixeduse' : 'Retaurant (dining hall)',
		'specialenergy' : null,
		'representative' : 'Residential home, homeless unit, cottage hospital and long stay hospital, detention centres and prisons' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['longTermResidential'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['longTermResidential']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(65.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['longTermResidential']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['longTermResidential']['electricity']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['longTermResidential']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(420.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['longTermResidential']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['longTermResidential']['naturalGas']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['longTermResidential'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['longTermResidential']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);

BenchmarkingJS.CibseTM46.Benchmarks.Category['generalAccommodation'] = {
		'key' : 22,
		'name' : 'General accommodation',
		'description' : 'General accommodation',
		'usage' : 'Space for sleeping, showers, basic domestic services',
		'schedule' : 'Non-continuous occupancy, often only used in evenings',
		'features' : 'Slow turnover of occupants requires fewer facilities and less laundry than for example a hotel',
		'services' : 'Heating, lighting, cooling, laundry and rying rooms',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'Boarding houses, university and school hostels, homeless units, nursing homes' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalAccommodation'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalAccommodation']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(60.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalAccommodation']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalAccommodation']['electricity']['adjustment']['occupancy'] = 0.21;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalAccommodation']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(300.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalAccommodation']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['generalAccommodation']['naturalGas']['adjustment']['occupancy'] = 0.10;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['generalAccommodation'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['generalAccommodation']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['generalAccommodation'] = {
  'definition': 'Number of hours when the premises are fully open to customers according to published hours',
  'reference': 2940,
  'maximum': 4284 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['emergencyServices'] = {
		'key' : 23,
		'name' : 'Emergency services',
		'description' : 'Emergency services',
		'usage' : 'Offices, accommodation, food services, cells, garaging and other activities as required',
		'schedule' : 'Normally continuous, some stations closed in the evenings and weekends',
		'features' : 'Provision of a variety of services that would be in separate categories in other parts of hte non-domestic stock (e.e accommodation, offices and vehicle garaging)',
		'services' : 'Heating, lighting, cooling, food services, office and training equipment',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'Police, fire and ambulance stations' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['emergencyServices'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['emergencyServices']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(70.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['emergencyServices']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['emergencyServices']['electricity']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['emergencyServices']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(390.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['emergencyServices']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['emergencyServices']['naturalGas']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['emergencyServices'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['emergencyServices']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);

BenchmarkingJS.CibseTM46.Benchmarks.Category['laboratoryOperatingTheatre'] = {
		'key' : 24,
		'name' : 'Laboratory or operating theatre',
		'description' : 'Laboratory or operating theatre',
		'usage' : 'Special equipment and conditions in at least 30% of floor area',
		'schedule' : 'Either weekdays or 24-hour multi-shift',
		'features' : 'Spaces requiring controlled ventilation and conditions',
		'services' : 'Heating, lighting, ventilation',
		'mixeduse' : null,
		'specialenergy' : 'Furnace or forming process',
		'representative' : 'Research chemical laboratory, hospital operating theatre' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['laboratoryOperatingTheatre'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['laboratoryOperatingTheatre']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(160.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['laboratoryOperatingTheatre']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['laboratoryOperatingTheatre']['electricity']['adjustment']['occupancy'] = 1.05;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['laboratoryOperatingTheatre']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(160.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['laboratoryOperatingTheatre']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['laboratoryOperatingTheatre']['naturalGas']['adjustment']['occupancy'] = 0.43;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['laboratoryOperatingTheatre'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['laboratoryOperatingTheatre']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['laboratoryOperatingTheatre'] = {
  'definition': 'Number of hours when the recorded number of occupants exceeds 25% of the nominal maximum number',
  'reference': 2040,
  'maximum': 8568 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['publicWaitingorCirculation'] = {
		'key' : 25,
		'name' : 'Public waiting or circulation',
		'description' : 'Bus or train station, shopping centre mall',
		'usage' : 'Public circulation or waiting facilities',
		'schedule' : 'Variable - intermittent to continuous',
		'features' : 'Waiting and circulation areas, booking desks, boarding facilities',
		'services' : 'Heating, lighting, cooling, snack services',
		'mixeduse' : 'Retail',
		'specialenergy' : null,
		'representative' : 'Bus stations, local train stations, shopping centre malls' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicWaitingorCirculation'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicWaitingorCirculation']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(30.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicWaitingorCirculation']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicWaitingorCirculation']['electricity']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicWaitingorCirculation']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(120.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicWaitingorCirculation']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['publicWaitingorCirculation']['naturalGas']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['publicWaitingorCirculation'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['publicWaitingorCirculation']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);

BenchmarkingJS.CibseTM46.Benchmarks.Category['terminal'] = {
		'key' : 26,
		'name' : 'Terminal',
		'description' : 'Regional transport terminal with concourse',
		'usage' : 'Waiting and boarding facilities for air, ship or regional/internation train travel',
		'schedule' : 'Daytime and evenings each day to near continuous',
		'features' : 'Concourse areas, booking areas, identification, customs, security and baggage handling',
		'services' : 'Heating, lighting, cooling, baggage handlings',
		'mixeduse' : 'Retail, restaurant, covered car park',
		'specialenergy' : null,
		'representative' : 'Large train stations, airport terminals' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['terminal'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['terminal']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(75.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['terminal']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['terminal']['electricity']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['terminal']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(200.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['terminal']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['terminal']['naturalGas']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['terminal'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['terminal']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);

BenchmarkingJS.CibseTM46.Benchmarks.Category['workshops'] = {
		'key' : 27,
		'name' : 'Workshop',
		'description' : 'Workshop or open working area (not office)',
		'usage' : 'Facilities for light mechanical work',
		'schedule' : 'Generally working week but can be multi-shift',
		'features' : 'Good access, mechanical tools and facilities',
		'services' : 'Industrial heating and lighting standards',
		'mixeduse' : null,
		'specialenergy' : 'Furnace or forming process',
		'representative' : 'Workshops, vehicle repair' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['workshop'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['workshop']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(35.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['workshop']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['workshop']['electricity']['adjustment']['occupancy'] = 0.34;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['workshop']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(180.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['workshop']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['workshop']['naturalGas']['adjustment']['occupancy'] = 0.16;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['workshop'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['workshop']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['workshop'] = {
  'definition': 'Number of hours when the recorded number of occupants exceeds 25% of the nominal maximum number',
  'reference': 2040,
  'maximum': 3672 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['storageFacility'] = {
		'key' : 28,
		'name' : 'Storage facility',
		'description' : 'Storage warehouse or depot',
		'usage' : 'Storage and goods handling areas',
		'schedule' : 'Continuous storage with weekday or multi-shift goods handling',
		'features' : 'Lightly serviced long term storage areas',
		'services' : 'Low level lighting and heating in storage areas',
		'mixeduse' : null,
		'specialenergy' : null,
		'representative' : 'Distribution warehouse without public areas, and local authority depot' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['storageFacility'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['storageFacility']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(35.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['storageFacility']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['storageFacility']['electricity']['adjustment']['occupancy'] = 0.45;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['storageFacility']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(160.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['storageFacility']['naturalGas']['adjustment']['degreedays'] = 0.70;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['storageFacility']['naturalGas']['adjustment']['occupancy'] = 0.20;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['storageFacility'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['storageFacility']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);
BenchmarkingJS.CibseTM46.Benchmarks.Occupancy['storageFacility'] = {
  'definition': 'Number of hours when the recorded number of occupants exceeds 25% of the nominal maximum number',
  'reference': 2040,
  'maximum': 4284 };


BenchmarkingJS.CibseTM46.Benchmarks.Category['coldStorage'] = {
		'key' : 29,
		'name' : 'Cold storage',
		'description' : 'Refrigerated warehouse',
		'usage' : 'Refrigerated storage and goods handling areas',
		'schedule' : 'Continuous storage with weekday or multi-shift goods handling',
		'features' : 'Refrigerated long term storage areas',
		'services' : 'Refrigeration, lighting and heating of handling areas',
		'mixeduse' : null,
		'specialenergy' : 'Blast chilling or freezing plant',
		'representative' : 'Refrigerated warehouse without public areas' };
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coldStorage'] = {};
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coldStorage']['electricity'] = BenchmarkingJS.CibseTM46.makeElectricity(145.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coldStorage']['electricity']['adjustment']['degreedays'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coldStorage']['electricity']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coldStorage']['naturalGas'] = BenchmarkingJS.CibseTM46.makeNaturalGas(80.0);
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coldStorage']['naturalGas']['adjustment']['degreedays'] = 0.55;
BenchmarkingJS.CibseTM46.Benchmarks.Energy['coldStorage']['naturalGas']['adjustment']['occupancy'] = 0.0;
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['coldStorage'] = {}
BenchmarkingJS.CibseTM46.Benchmarks.Metrics['coldStorage']['GFA'] = BenchmarkingJS.CibseTM46.makeGFA(true, 1.0);

