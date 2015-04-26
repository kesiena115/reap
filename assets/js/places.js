

$(document).ready(function() {

	function parseURLParams(url) {
		var queryStart = url.indexOf("?") + 1,
		queryEnd   = url.indexOf("#") + 1 || url.length + 1,
		query = url.slice(queryStart, queryEnd - 1),
		pairs = query.replace(/\+/g, " ").split("&"),
		parms = {}, i, n, v, nv;

		if (query === url || query === "") {
			return;
		}

		for (i = 0; i < pairs.length; i++) {
			nv = pairs[i].split("=");
			n = decodeURIComponent(nv[0]);
			v = decodeURIComponent(nv[1]);

			if (!parms.hasOwnProperty(n)) {
				parms[n] = [];
			}

			parms[n].push(nv.length === 2 ? v : null);
		}
		return parms;
	}

	var urlString = document.URL;
	var urlParams = parseURLParams(urlString);


	var place = urlParams['location'];

	var name = "Unavailable";
	var description= "Unavailable";
	var must_win_battle = "Unavailable";

	var reap_index_number = "";
	var reap_index_percent = "";

	var top_industry_clusters = ["Unavailable", "", ""];
	var top_research_institutions = ["", "", ""];
	var catalysts = [["","Unavailable"]];
	var team = [];

	var celebrated_regional_innovation = "";

	var top_business_parks = ["", "", ""];
	var celebrated_regional_entrepreneur = "";

	/*
	Patents/year = Andalusia, Finland, Zhejiang, New Zealand, scotland, Istanbul, Veracruz
	Published Papers/year = Spain, Finland, China, New Zealand, UK, Turkey, Mexico
	STEM Graduates/year = Spain, Finland, #, New Zealand, UK, Turkey, Mexico
	Gross R&amp;D Expenditure = Andalusia, Finland, Zhejiang, New Zealand, scotland, Istanbul, Mexico
	Intellectual Property Protection = Spain, Finland, China, New Zealand, UK, Turkey, Mexico
	GDP per capita = Andalusia, Finland, Zhejiang, New Zealand, scotland, Turkey/Istanbul, Veracruz
	S &amp; C Corps Incorporated/year = Spain, Finland, #, New Zealand, UK, Turkey, ,
	Total Early-Stage Entrepreneurship = Spain, Finland, China, New Zealand, UK, Turkey, Mexico
	Venture Capital Investments in Region/year = Spain, Finland, #, New Zealand, UK, ,
	Number of days to start a business = Spain, Finland, China, New Zealand, UK, Turkey, Mexico
	GDP/capita = Andalusia, Finland, Zhejiang, New Zealand, Scotland, Turkey/Istanbul, Veracruz
	$ Invested in University Startups (USD)/year = , , , ,
	# New PhD Graduates/year = Spain, Finland, , New Zealand, UK, Turkey, Mexico
	Total Employment/ year = Spain, Finland, , New Zealand, UK, , , 
	*/
		////////////////////////////////// COHORT 1 //////////////////////////////////

	if (place == "andalusia-spain") {
		name = "Andalusia, Spain";


		team = [["Lourdes N&uacute;&ntilde;ez M&uuml;ller", "Director of Knowledge Transfer at Granada Health Tech Park (PTS Granada). Lourdes Nunez Muller is the Director of Knowledge Transfer at the Granada Health Technology Park (PTS Granada). She received an MBA from IESE Business School and her B.S., M.S. and Ph.D. in Pharmacy from the University of Granada. She published a book in 2010 titled 'Clinical and Transactional Research, Through a Model' and has also published several scientific research and career development articles. Previously, Lourdes worked at Sanitas as the Manager of E-Health Services and Home Healthcare Division in Madrid. She relocated to Boston in a strategic product development and business development role, which made her critically involved in bringing new medical technologies to market at CH-Werfen Group. She was selected to work at the Dana-Farber Cancer Institute, one of the leading cancer research centers in the US. Dr. Muller worked there as a Biopharmaceutical Corporate Relations Liason, a new role funded by Novartis. She focused on early phase human clinical trials, tailoring a more productive clinical research portfolio strategy, sourcing innovations with biotech and pharmaceutical collaborators and improving operating efficiencies in the research program. Since 2006, Dr. Nunez Muller has worked in Spain as Director of Knowledge Transfer at PTS Granada. She is responsible for establishing PTS as a National Life Science Brand, fostering technology transfer/providing services for emerging companies, promoting interdisciplinary research in biomedicine at an international level in order to make medical advances through the understanding, diagnosis, treatment, cure and prevention of illnesses, and consolidating a health sciences business framework based on technology and aimed at clinical practice. Lourdes is can be contacted at via email at Lnunez@ptsgranada.com"], 
				["Ram&oacute;n Gonz&aacute;lez Carvajal", "Tenured Professor and Vice President of Technology Transfer. Ram&oacute;n Gonz&aacute;lez Carvajal is a Professor of Electrical Engineering at the University of Seville. He received a BS, MS (1995) and PhD (1999) in Electrical Engineering from the University of Seville. At the University, he also serves as Vice-rector of Technology Transfer, General Manager of the Research Foundation and Coordinator of the Excellence TECH. He is the co-author of 10 patents, 5 of which are under contract with Seiko-Epson in Japan. He is also the co-founder of the company Adevice Solutions. Dr. Carvajal researches low voltage and low-power circuit design in nanometer scale technologies. He has published more than 300 academic papers and has participated in over 70 research projects funded by organizations including NASA, National Science Foundation, EPSRC, EUREKA the European Framework Program, and others. He has worked as a visiting professor at Texas A&amp;M University, New Mexico State University, The Imperial College of Engineering and Medicine in London, and University of Catania."], 
				["Juan Carrasco", "Co-founder of GPTech / Professor of Electronic Engineering. Juan M. Carrasco is a Full Professor at Seville University in the Department of Electronic Engineering. He received a M.S. (1989) and Ph.D. (1992) in industrial engineering from Seville University, Spain. He is originally from San Roque, Spain. His work developing power converters has been integral to the development of renewable energy technologies in Spain. Professor Carrasco has many years of experience working in the power electronics field. He was involved in many industrial applications for the design and development of power converters applied to renewable energy technologies. Currently, he is researching Smart Grids. He is focused on the integration of renewable energy sources through these Smart Grids. In 2002, Juan founded a tech company called GPtech (Insert Hyperlink: www.greenpower.es). Juan currently serves as President of GPtech. GPtech is a tech company that specializes in renewable energies, efficiency and energy saving. Currently the company&#39;s turnover is over $35M and its products are sold in North America, South America, Europe and Asia."], 
				["Javier Gutierrez Rumbao", "Innovation and Entrepreneurship Advisor. entrepreneurship consultant. He was previously the Director of Technology Analysis for the Regional Ministry of Economy, Innovation and Science for the government of Andulucia. He received a degree in industrial engineering from the University of Seville. He served as a management consultant for 8 years and has experience in multiple business industries. For the past two years, he built a new ICT engineering start-up. His current areas of interest include innovation, entrepreneurship and regional development."], 
				["&Aacute;ngel Ortiz S&aacute;nchez", "Director-General for Telecommunications and Information Society Policy. &Aacute;ngel Ortiz S&aacute;nchez (Almer&iacute;a, 1976) holds a degree in Economics and Business Administration from the University of Almer&iacute;a and MBA from Florida International University (USA). He is Director-General for Telecommunication and Information Society in the Regional Ministry of Economy, Innovation, Science and Employment of the Government of Andaluc&iacute;a. Previously, he held the positions of Director of Quality in the Services for Employment in the former Regional Ministry of Employment; Coordinator of the Office of Reimbursable Support Funds for Andaluc&iacute;a; and Responsible of the Support Fund for the Internationalization of Andaluc&iacute;a's Economy, in the Trade Promotion Agency of Andalusia (Extenda). In the private sector, Ortiz S&aacute;nchez was Director of Operations in &Iacute;bero Credit and corporate credit analyst in Cristal Credit International LLC, both in Miami (USA)."], 
				["Ignacio Ochoa Mendoza", "Director of Government and Businesses for the Southern Region. Ignacio is a telecommunications engineer who graduated from the Economics / Business Administration department. He is currently Director of Government and Businesses for the South Region at Telef&oacute;nica Espa&ntilde;a. He has previous experience in the telecommunications industry in the US, South America and the UK."]];
	}

	else if (place == "finland") {
		name = "Finland";

		team = [["Pirjo Kutinlahti", "Ministry of Employment and the Economy."],
				["Veli-Pekka T Heikkinen", "Unavailable"],
				["Lauri Lehtovuori", "Manager, Markets at PwC. Lauri joined the Finnish REAP team representing Aaltoes (Aalto Entrepreneurship Society), a student-run organization that was kicked-off in 2010 by students of Aalto University. Aaltoes is driving a positive cultural change in Finland so that academic students and researcher alike would start new businesses and write their own growth stories. The vision of the society is to turn Finland and the nearby area (Moscow, St. Petersburg, the Baltics and Stockholm) into one of the next entrepreneurship hubs by 2025. According to Lauri there is still a long way go but there is a simple formula that helps in reaching that goal: determination, hard work, the help of experienced entrepreneurs and not being afraid of trying out new things. Currently Lauri works with the most promising Finnish startup and growth companies at PricewaterhouseCoopers (PwC) Finland. The Economist (2013): &#39;IN 2010 A GROUP of students at Aalto University, just outside Helsinki, embarked on the most constructive piece of student activism in the history of the genre. They had been converted to the power of entrepreneurialism during a visit to the Massachusetts Institute of Technology.&#39;"],
				["P&auml;ivi Fadjukoff", "Head of Planning &amp; Development at the Agora Center, University of Jyv&auml;skyl&auml;. The AC is an institute for ambitious co-creation in the area of interdisciplinary human technology + human centric solutions research and development. The Agora Center creatively combines research of high international standard, in a range of scientific disciplines, with the expertise derived from its diverse partner network. The Center is grounded in a shared vision of developing the future knowledge society from a human-centric point of view."]];
	}

	else if (place == "hangzhou-china") {
		name = "Hangzhou, China";

		team = [["Jiang Wei", "Unavailable"],
				["Jennifer Cheung", "Huadan Inc."]];
	}

	else if (place == "new-zealand") {
		name = "New Zealand";
		description = "New Zealand prides itself as a smart, innovative nation. From ground-breaking cancer research, award winning digital content, to world leading dairy nutrition, our products and services are exported around the world. But much of our potential in this area remains unrealised and fostering a high performing science and innovation sector is key to our future economic well-being. Innovation is the name of the game for New Zealand. Kiwi companies are working hard to be smart, think sharper and get to market faster. New Zealanders are an ingenious people. We have a strong heritage of developing great ideas borne out of practical neccessity, or inspired brilliance, or simply an instinct of what might work. Like other governments around the world, the New Zealand government continues to signal the importance it places on science and innovation as a key driver of our economic wellbeing. The Ministry of Business, Innovation and Employment's (MBIE) Science and Innovation Group has been charged with lifting our economic, environmental and social performance by driving the science and innovation sector. We do this through our strategic leadership and through the networks we build across government, research organisations, business and industry. MBIE is committed to growing the number of driven, successful entrepreneurs who are willing to help grow the innocation ecosystem in New Zealand. We support a number of programmes and initiatives that all contribute to this goal. We are partnering with people and organisations across the ecosystem to drive the growth of highly-skilled entrepreneurs.";
		must_win_battle = "New Zealand aims to become the innovation-hub of the Asia-Pacific rim.";

		reap_index_number = "65.00";
		reap_index_percent = "10%";

		top_research_institutions = ["University of Canterbury", "University of Otago", "University of Auckland"];
		top_industry_clusters = ["Biotech Innovation Cluster", "High Tech Cluster", "Automobile Innovation Cluster"];
		catalysts = [["http://www.callaghaninnovation.govt.nz/", "Callaghan Innovation"],
						["http://www.wynyard-quarter.co.nz/Wynyard-Quarter/Home.aspx", "Wynyard Quarter Innovation Precinct"],
						["http://kiwilandingpad.com/", "Kiwi Landing Pad and Catapult"], 
						["http://lightninglab.co.nz/", "Lightning Lab - New Zealand's Digital Accelerator"]];

		team = [["Erin Wansbrough", "Regional Manager, Callaghan Innovation."], 
				["Phil Love", "General Manager, BusinessNZ. Managing the Major Companies Group which is the top 100 companies, business development and retention and commercial partnerships"],
				["Brett O&#39;Riley", "CEO, Auckland Tourism, Events and Economic Development. Brett has worked on a wide range of start-up projects in the ICT industry, both in New Zealand and overseas. He has held senior management positions for over 20 years in the private and public sectors. Recently, he served as Deputy Chief Executive, Business Innovation and Investments for the New Zealand Ministry of Science + Innovation and as the founding CEO of the NZICT Group. The NZICT Group is made up of New Zealand's leading ICT companies Currently, Brett serves as Vice Chairman of the Pacific Telecommunications Council, Advisory Council, and Chairman of the Network of Aotearoa Computer Clubhouses. He is also a member of the Board of Trustees of the Manaiakalani Education Trust."],
				["Peter Rose", "New Project Director. Peter Rose has an MBA from Cranfield School of Management (UK), he trained as a Chartered Accountant with KPMG and Citibank and is a member of the IOD. Peter's first fully fledged start-up was Hotech Edge Ltd, an IT company that he ran for 5 years, the business started in NZ before entering Australia, Thailand, the US and the UK, Hotech is now based out of the UK. He then moved into Private Equity and Venture Capital managing a portfolio of companies (startups through to mature businesses) for high net worth individuals before returning to the Corporate World at PGG Wrightson (Head of Strategy and Business Development) and more latterly with Ngai Tahu Property as GM Strategy and Business Development. Ngai Tahu are the Maori people of the southern islands of New Zealand. Ngai Tahu have commercial interests that total almost a billion dollars in assets. Peter sits on the Board of the NZ Merino Company and Flow Software, a business that he invested in when it had just one FTE, today Flow Software has offices in NZ and Australia with 25 FTE's."],
				["David Beard", "Partner, MOVAC. David is a General Partner with venture capital firm MOVAC, based in Wellington, New Zealand (www.movac.co.nz). Since joining MOVAC in early 2006, David has been a partner in both of its funds. Fund 2 was a $15m start-up angel fund and the current fund, Fund 3, a $42m early expansion fund. Over the last 6 years David has reviewed over 500 businesses and taken eight through to investment, including negotiation, legals and due diligence. David is currently a director of three of MOVAC's ventures including PowerbyProxi, Kiwi Semiconductor, Migco Pharmaceuticals. Prior to joining MOVAC, David was an entrepreneur and spent 5 years setting up and running his own web based SaaS businesses with offices in New Zealand and the UK. David&#39;s earlier career was as a management consultant for Deloitte and IT program director for multi-million dollar corporate projects."],
				["Ian Town", "Professor, University of Canterbury. As Deputy Vice-Chancellor at the University of Canterbury Ian Town brings a wealth of experience to the New Zealand tertiary education sector. Ian has held a range of portfolios at the University of Canterbury and is currently leading the project team engaged with Government in developing the University's strategic direction in earthquake recovery. Throughout his time he has retained a major interest in research strategy, including leading the University's strategic projects around the Performance Based Research Fund, research and innovation, links with commercial companies and led the establishment of Research Institutes. He initiated a number of relationships that form the basis of New Zealand ICT Innovation Institute (NZi3) including the partnership with IBM that lead to the establishment of the BlueFernTM supercomputer unit. He was trained in Medicine at the University of Otago was appointed as the Dean of the Christchurch School of Medicine &amp; Health Sciences, the position he held until his appointment at the University of Canterbury in 2005. His research career centred on clinical and applied research into respiratory disorders, mainly asthma, COPD, and pneumonia. He was the Director of the Canterbury Respiratory Research Group for twelve years, and has published more than 100 articles on a wide variety of respiratory conditions."],
				["Mitch Olson", "Digital Sector Entrepreneur. Mitch Olson is Co-founder of SmallWorlds, New Zealand's largest social gaming company with over 10 million registered players. SmallWorlds is a next generation social game &amp; 3D virtual environment blending rich visuals, social interplay, and a healthy dose of imagination into an immersive and engaging experience. Members shape the world, selecting from thousands of items to create unique spaces. Whether nurturing exotic plants in gardens, crafting rare items or enjoying the companionship of friends in popular hang-out spots, there are a wide variety of enjoyable activities to suit any mood. Opportunities for adventure are endless, as citizens play the starring role in elaborate movie-like missions - or play the director by creating their own interactive narrative for others to enjoy."]];

		celebrated_regional_innovation = "The Ski Plane";
		celebrated_regional_entrepreneur = "Sir Angus Tait";

	}

	else if (place == "scotland") {
		name = "Scotland";

		team = [["Simon Grey", "Chief Executive, AWS Ocean Energy Ltd. Simon is a chartered engineer with 28 years experience of power generation projects and business management of which 22 years have been in the renewables sector. He is responsible for the day-to-day running of the company."],
				["Donna Chisholm", "Head of Business Innovation and Growth Sectors. Donna Chisholm has an instrumental role in fostering innovation and entrepreneurship in Scotland. She is the Head of Business Innovation and Growth Sectors, Highlands &amp; Islands Enterprise, operating at a strategic level across Highlands and Islands of Scotland. Her work areas include overseeing the continual growth of key business sectors, development of programs in innovation and entrepreneurship, leadership and management, international trade and business mentoring, all designed to accelerate business growth. Before joining Highlands and Islands Enterprise, Donna was Project Manager for the redevelopment of Eden Court in Inverness, delivering a &pound;23 million arts center from inception to completion. Prior to this, Donna worked for East Ayrshire Council as a Service Head. She also worked on programs for young people focusing on science, technology, engineering, and mathematics and on graduate employment."],
				["Jonathan Harris", "Editor, Young Company Finance. Jonathan Harris is passionate about entrepreneurial financing for growth. He is the publisher and editor of Young Company Finance (YCF), a monthly review of early stage high growth companies in Scotland, which focuses particularly on the issues of how to fund growth. He acquired YCF from its founder in November 2000. Jonathan has subsequently expanded the business to encompass special reports on specific market sectors (to date Life Sciences, Digital Entertainment, and Renewable Energy), a very successful annual conference now in its eleventhyear, and in 2006 a new edition of YCF tracking young companies in the North of England (but recently discontinued). In 2010 Jonathan started a new project, Spinouts UK, which has created an online database of all spinouts from universities across the UK, which is regularly updated as the basis of a Quarterly Journal and Annual Report.  Jonathan comes from an impressive industrial background. For 15 years, he was a director and general manager at the international drilling company, Atlantic Drilling Company Ltd and served as chairman of the International Association of Drilling Contractors&#39; North Sea chapter, and on the Industry Advisory Board appointed by the then Minister for Energy. Jonathan is a director of LNC Scotland, the national business angel association."],
				["Ian Ritchie", "Chairman, Iomart. Ian Ritchie is a serial entrepreneur in the IT sector. He is the Chairman of several software companies, such as iomart plc. (AIM:IOM), Computer Application Services Ltd., the Interactive Design Institute, Blipfoto, Cogbooks, Musemantik and RedFox Media. He is also Chairman of Our Dynamic Earth, the Edinburgh Science Center. In addition to his enterprises, he has been actively leading several professional networks such as the Edinburgh International Science Festival, ScotlandIS and Royal Academy of Engineering. Ritchie has also been active in venture capital as a director of Northern Venture Trust plc from 1997-2001 and as a member of the advisory board of Pentech Ventures from 2001. He is a member of the 'Access to Finance' expert group (A2FG) at the UK's Department for Business Innovation and Skills."],
				["Clive Reeves", "Executive at Scottish Enterprise."],
				["Jonathan Levie", "Professor of Entrepreneurship, University of Strathclyde. From 2000 to 2005 Jonathan was Director of the Hunter Centre for Entrepreneurship at Strathclyde. He directs the UK Global Entrepreneurship Monitor programme and also leads the Scottish GEM team. Before joining the University of Strathclyde in 1999 to create a new postgraduate programme in Technology Entrepreneurship, he was Research Fellow at the Foundation for Entrepreneurial Management at London Business School, where he was also Associate Co-ordinator of the Global Entrepreneurship Monitor, a major international research project led by London Business School and Babson College. In 1997 he was Visiting Research Fellow and Part-time Lecturer in Management at Babson College, Wellesley, MA. He was formerly EC Research Fellow at INSEAD, France, and College Lecturer in the Department of Management at University College, Cork. He holds a Ph.D. from the University of London (London Business School) and a B.Sc. (Natural Sciences) and M.Sc (Management) from the National University of Ireland. Jonathan has been researching and teaching entrepreneurship since 1982. His main research interests are comparative entrepreneurial strategies, the evolution of young firms, the environment for entrepreneurship, and the nature of interaction between entrepreneurs and resource providers. His papers have been accepted for publication in Entrepreneurship Theory &amp; Practice, Research Policy, Small Business Economics, Family Business Review, Journal of Economic Issues, and Frontiers of Entrepreneurship Research, among others."]];
	}

	else if (place == "istanbul-turkey") {
		name = "Istanbul, Turkey";
		must_win_battle = "Istanbul aims to become an innovation-hub.";

		team = [["Dilek Cetindamar", "Professor. She received her B. S. degree from Industrial Engineering Department at Bogazi&ccedil;i University, her M.A degree from Economics Department at BU, and her Ph.D. degree from Management Department at Istanbul Technical University in 1995. Before her appointment to the Faculty of Management at Sabanci University in 1999, she worked at: Bogazi&ccedil;i University, Case Western Reserve University (USA), Portland State University (USA), and Chalmers University of Technology (Sweden). She was at Cambridge University, UK as a visiting professor in 2008. She participated in many international projects, including UN and EU projects. She has more than 50 publications, including 8 books. She received an &#39;encouragement award&#39; from Turkish Academy of Sciences in 2003."],
				["Berna Samiloglu Acar", "Director - New Businesses &amp; Entrepreneurship - Turkcell."],
				["Ihsan Elgin", "Director, Fit Startup Factory (tech business accelerator). After graduating from Dokuz Eyl&uuml;l University with a degree in Economics, Elgin took on several corporate entrepreneurial roles in a variety of companies for 8 years. While pursuing his career, he graduated from Ko&ccedil; University's Executive MBA Program. After that he joined the executive team of Kodalfa, Inc., a newly formed Turkish start-up company. Kodalfa was recognized as one of the seven most high impact entrepreneurial companies in Turkey by Endeavor in 2008 and started to operate in the United States under the Climate Minder Group, where Elgin was a co-founder. They sold Climate Minder to one of the biggest irrigation company in the US at the end of 2012. Ihsan Elgin is currently Executive Director of the Center for Entrepreneurship at &Ouml;zyegin University to design and manage a Venture Accelerator - Fit Startup Factory - for techno startups to commercialize innovative ideas. Elgin gives the lectures of 'Access to Capital' , 'Business Model Generation' and consults corporates about innovation management and entrepreneurship. Ihsan Elgin also invests in seed stage startups as an Angel Investor."],
				["Ussal Sahbaz", "Private Sector Development Specialist."],
				["Alaaddin Alpay", "Developer Community Manager, Partners &amp; Alliances Department at Turkcell. Alaaddin received a BS from Istanbul&#39;s Yildiz Technical University in mechanical engineering with a focus in automotive engineering. He later earned his MBA with a focus in management and marketing from the State University of West Georgia in Carrollton, Georgia. Alaaddin joined the team at Turkcell, the leading mobile phone operator in Turkey, over 12 years ago, and has worked in a number of different roles: Strategic Business Development Expert for the CEO Office: Mid to long-term business development and investment focus; Product Strategy Expert for the Marketing Department: Short to mid-term strategic product and service development; Business Development Expert for the Value Added Services Department: New/Innovative product and service development and launch; Head of Emerging Partner Services Development for the Partnering Department: New product and services in emerging areas from partner ecosystem; Head of Innovation Governance for the Partnering Department: Internal and external product and service development process management, building an innovation network for company, organizing and running business plan and innovation competitions, strategic partner ecosystem management (universities, technopolis, NGOs, public institutions); Head of Entrepreneurship for the New Business Development Department: Utilization of external community power for development of new product and services, community building and management, organizing entrepreneurship focused events, seminars, strategic partner ecosystem management (universities, technopolis, NGOs, public institutions, investor community ranging from angels, angel groups to VCs); Head of Developer Community Management for the Partners &amp; Alliances Department (current): Building an evangelist network to connect developers ranging from university programming students and freelance developers to software development houses and corporate IT professionals. Encouraging these communities to partner with Turkcell to develop new products, services, and applications. Empowering these communities usingTurkcell’s assets such as customer databases, marketing and communication channels, marketing and technology know-how, innovation network, and so on."],
				["Ahmet Murat Fis", "Assistant Professor of Entrepreneurship at Ozyegin University. Dr. Ahmet Murat Fis got his BA degree in Bogazici University, Istanbul, Turkey and MBA degree in Oklahoma State University, Stillwater, USA. After his MBA, he worked for industry with various responsibilities in various departments such as the Office of the President, Human Resources, Quality, and Information Systems. After seven years of industry experience in which he also attended a two year Management Trainee Program, he began the PhD Program at Sabanci University, Istanbul, Turkey. He got his PhD degree in January, 2009. Besides some teaching experience as a research assistant, he has presented several papers and posters in various local and international conferences. His research interests focus on corporate entrepreneurship, entrepreneurship, and TQM in general. He also serves as assessor/chief assessor for Kalder in the Turkish National Quality Award since 1999."]];
	}

	else if (place == "veracruz-mexico") {
		name = "Veracruz, Mexico";
		must_win_battle = "Mexico aims to become an innovation-hub.";
		team = [["Victor Hugo Moctezuma Aguirre", "General Manager"],
				["Leonel Azuela", "Entrepreneur"],
				["Jos&eacute; Antonio Mansur", "Government representative"]];
	}

	////////////////////////////////// COHORT 2 //////////////////////////////////

	else if (place == "morocco") {
		name = "Morocco";
	}

	else if (place == "london-uk") {
		name = "London, United Kingdom";
		
	}

	else if (place == "qatar") {
		name = "Qatar";
		
	}

	else if (place == "moscow-russia") {
		name = "Moscow, Russia";
		
	}

	else if (place == "puerto-rico") {
		name = "Puerto Rico";
		
	}

	else if (place == "valencia-spain") {
		name = "Valencia, Spain";
		
	}
	else if (place == "singapore") {
		name = "Singapore";
		
	}

	else if (place == "rio-de-janeiro-brazil") {
		name = "Rio De Janeiro, Bazil";
		
	}

	else if (place == "seoul-south-korea") {
		name = "Seoul, South Korea";
		
	}

	else {
		name = "Location Unavailable";
	}


	var container = document.getElementsByClassName('container');
	container.h.id = place;

	var titleElement = document.getElementById('title');
	titleElement.innerHTML = name;

	var descriptionElement = document.getElementById('description');
	descriptionElement.innerHTML = description;

	var teamElement = document.getElementById('team');

	var teamOutput = "";

	for (var index = 0; index < team.length; index++) {
		var member = team[index];
		var color = "";

		if (index % 3 === 0) {
			color = "red-reap";

		} else if (index % 3 === 1) {
			color = "light-blue-reap";

		} else {
			color = "pink-reap";
		}
		teamOutput += '<div class="team-member-div '.concat(
				color,
				' col-sm-1 team-member-name" data-container="body" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-content="',
				member[1],
				'" data-original-title="" title="" id="individual-',
				index,
				'"> <h6>',
				member[0],
				'</h6></div>');
	}

	teamElement.innerHTML = teamOutput;

	var must_win_battleElement = document.getElementById('must_win_battle');
	must_win_battleElement.innerHTML = must_win_battle;

	var reap_index_numberElement = document.getElementById('reap_index_number');
	reap_index_numberElement.innerHTML = reap_index_number.concat('<i class="fa fa-caret-down"></i> ', reap_index_percent);

	var top_industry_clustersElement = document.getElementById('top_industry_clusters');
	top_industry_clustersElement.innerHTML = top_industry_clusters[0].concat(
								'</p><p class="less-padding-bottom white-text">',
								top_industry_clusters[1],
								'</p><p class="less-padding-bottom white-text">',
								top_industry_clusters[2]);

	var specific_catalystElement = document.getElementById('specific_catalyst');

	var outputCatalyst = '<p class="dashboard-block-title">Catalysts / Initiatives</p>';
	for (var index = 0; index < catalysts.length; index++) {
		var specific_catalyst = catalysts[index];
		outputCatalyst += '<p class="listed-p"><a class="no-decorate-link" href="'.concat(
			specific_catalyst[0], 
			'">',
			specific_catalyst[1],
			'</a></p>');
	}
	specific_catalystElement.innerHTML = outputCatalyst;

	function addString(carouselID, title, body) {
		addList(carouselID, title, [body]);
	}

	function addList(carouselID, listTitle, list) {
		var isEmpty = true;
		var paragraphs = "";
		for (index in list) {
			var content = list[index]
			if(content) {
				isEmpty = false;
			}
			paragraphs += "<p class='listed-p less-padding-bottom white-text'>" + content + "</p>";
		}

		if(isEmpty) {
			return;
		}

		$("#" + carouselID + " > .carousel-inner").append(
			"<div class='item center-div'>" +
            	"<h4 class='white-title'>" + listTitle + "</h4>" +
            	paragraphs +
            "</div>"
		);

		var count = $("#" + carouselID + " .carousel-dot-control").size();

		$("#" + carouselID + " > .carousel-indicators").append(
			"<li data-target='#" + carouselID + "' data-slide-to='" + count + "' class='carousel-dot-control'></li>"
		);

		resetActiveCarousel(carouselID);
	}

	function addGraph(carouselID, xlabels, ydata, title, canvasId) {
    	if((xlabels.length < 1) || (ydata.length < 1)) {
    		return;
    	}

		var config = {
		labels : xlabels,
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					data : ydata
				}
			]
		}

		var count = $("#" + carouselID + " .carousel-dot-control").size();
		
		$("#" + carouselID + " > .carousel-indicators").append(
			"<li data-target='#" + carouselID + "' data-slide-to='" + count + "' class='carousel-dot-control'></li>"
		);

		$("#" + carouselID + " > .carousel-inner").append(
			"<div class='item'>" +
            	"<h4 class='white-title'>" + title + "</h4>" +
            	"<canvas id='" + canvasId + "' class='graph-data' width='400' height='200'></canvas>" +
            "</div>"
		);

		var canvas = document.getElementById(canvasId);
		new Chart(canvas.getContext("2d")).Line(config, defaults);
		resetActiveCarousel(carouselID);
  	}

	function resetActiveCarousel(carouselID) {
		$("#" + carouselID + " > .carousel-indicators .carousel-dot-control").each(function(index) {
			if(index == 0) {
				$(this).addClass('active');
			} else{
				$(this).removeClass('active');
			}
		});

		$("#" + carouselID + " > .carousel-inner .item").each(function(index) {
			if(index == 0) {
				$(this).addClass('active');
			} else{
				$(this).removeClass('active');
			}
		});

	}

	for (var i=0; i<10; i++) {
		if ($('#individual-'+i)) {
			$('#individual-'+i).popover('hide');
		}
	}

	var defaults = {

		//Boolean - If we show the scale above the chart data			
		scaleOverlay : false,

		//Boolean - If we want to override with a hard coded scale
		scaleOverride : false,

		//** Required if scaleOverride is true **
		//Number - The number of steps in a hard coded scale
		scaleSteps : null,
		//Number - The value jump in the hard coded scale
		scaleStepWidth : null,
		//Number - The scale starting value
		scaleStartValue : null,

		//String - Colour of the scale line	
		scaleLineColor : "white",

		//Number - Pixel width of the scale line	
		scaleLineWidth : 1,

		//Boolean - Whether to show labels on the scale	
		scaleShowLabels : true,

		//Interpolated JS string - can access value
		scaleLabel : "<%=value%>",

		//String - Scale label font declaration for the scale label
		scaleFontFamily : "'whitney_htflight_condensed'",

		//Number - Scale label font size in pixels	
		scaleFontSize : 12,

		//String - Scale label font weight style	
		scaleFontStyle : "normal",

		//String - Scale label font colour	
		scaleFontColor : "white",	

		///Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : true,

		//String - Colour of the grid lines
		scaleGridLineColor : "white",

		//Number - Width of the grid lines
		scaleGridLineWidth : 1,	

		//Boolean - Whether the line is curved between points
		bezierCurve : false,

		//Boolean - Whether to show a dot for each point
		pointDot : true,

		//Number - Radius of each point dot in pixels
		pointDotRadius : 3,

		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth : 1,

		//Boolean - Whether to show a stroke for datasets
		datasetStroke : true,

		//Number - Pixel width of dataset stroke
		datasetStrokeWidth : 2,

		//Boolean - Whether to fill the dataset with a colour
		datasetFill : true,

		//Boolean - Whether to animate the chart
		animation : true,

		//Number - Number of animation steps
		animationSteps : 60,

		//String - Animation easing effect
		animationEasing : "easeOutQuart",

		//Function - Fires when the animation is complete
		onAnimationComplete : null

	}

	var xlabels = [];
	var ydata = [];


	////////////////////////
	//  icap-chart
	////////////////////////
	if (document.getElementById("andalusia-spain")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [43.271, 68.408, 74.263, 65.688, 83.924, 103.829, 108.655, 130.269, 159.463, 209.126, 178.991];
	}

	else if (document.getElementById("finland")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [1395.907, 1385.309, 1311.435, 1291.33, 1520.217, 1464.146, 1644.956, 1598.218, 1500.341, 1485.486, 1509.529];
	}

	else if (document.getElementById("hangzhou-china")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [18.25, 16.976, 39.556, 78.505, 78.471, 133.783, 176.529, 225.126, 233.301, 396.264, 515.263];
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [307.943, 306.277, 312.223, 362.335, 385.948, 369.095, 399.098, 388.673, 333.002, 327.369, 300.289];
	}

	else if (document.getElementById("scotland")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [4.806, 7.976, 29.49, 69.665, 126.292, 167.7, 196.416, 214.676, 232.038, 269.593, 276.317];
	}

	else if (document.getElementById("istanbul-turkey")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [4.806, 7.976, 29.49, 69.665, 126.292, 167.7, 196.416, 214.676, 232.038, 269.593, 276.317];
	}

	else if (document.getElementById("veracruz-mexico")) {
		xlabels = ["2000","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [0.583, 1.5, 4.5, 0.2, 1.367, 0.25, 3.093, 3.2, 3.5, 0.583];
	}

    // *********** Cohort 2 **************    

    else if (document.getElementById("morocco")) {
			xlabels = ["2004","2005","2006","2007","2008","2009","2010","2011","2012"];
			ydata = [104, 140, 178, 150, 177, 135, 152, 16, 197, ];
		}
    
    else if (document.getElementById("moscow-russia")) {
			xlabels = ["2000", "2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
			ydata = [295.246, 296.111, 263.675, 270.828, 299.607, 358.346, 345.537, 363.969, 307.004, 333.047, 345.485, 5.793];
		}
    
    else if (document.getElementById("london-uk")) {
			xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
			ydata = [639.998, 636.986, 547.297, 596.369, 562.982, 618.433, 666.171, 698.566, 595.29, 585.085, 581.016];
    }
    
    else if (document.getElementById("valencia-spain")) {
			xlabels = ["2000", "2001","2002","2003","2004","2005","2006","2007","2008"];
			ydata = [37.25, 51.89, 59.55, 64.25, 63.46, 69.54, 60.26, 76.13, 84.92];
    }     
    
    else if (document.getElementById("seoul-south-korea")) {
			xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
			ydata = [792.735, 822.688, 909.3, 1097.438, 1386.42, 1705.557, 1956.602, 2188.4, 2134.889, 2492.561, 2682.144];
    } 
    
    else if (document.getElementById("rio-de-janeiro-brazil")) {
			xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
			ydata = [18.647, 34.194, 36.118, 49.484, 45.435, 44.119, 44.75, 47.7, 70.91, 51.045, 68.487];
    } 
    
    else if (document.getElementById("singapore")) {
			xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012"];
			ydata = [516, 523, 624, 626, 641, 569, 626, 696, 793, 750, 895, 1056, 1081];
    }

    addGraph("carousel-example-generic", xlabels, ydata, "Patents/year", "icap-chart");

    ////////////////////////
	//  icap-chart2
	////////////////////////
	xlabels = [];
	ydata = [];
		
	if (document.getElementById("andalusia-spain")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009"];
		ydata = [14795.2, 15323, 16062.3, 16099.3, 17025, 18345.5, 19525.8, 20993.3, 21509.1, 21542.6];
	}

	else if (document.getElementById("finland")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009"];
		ydata = [4843.8, 4930, 4904.3, 4899.4, 5018.7, 4813.4, 5088, 4989.6, 5112.4, 4949.1];
	}

	else if (document.getElementById("hangzhou-china")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009"];
		ydata = [18478.7, 21134.1, 23269.1, 28767.9, 34845.6, 41603.6, 49575.1, 56811.2, 65300.5, 74019.2];
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009"];
		ydata = [2850.8, 2850.9, 2739.8, 2799.8, 2825.1, 2987.2, 3081.8, 3175.8, 3323.4, 3187.8];
	}

	else if (document.getElementById("scotland")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009"];
		ydata = [48216.1, 45586.5, 44642.9, 45232.1, 45491.6, 45658.1, 46746.5, 47138.2, 46333.1, 45648.8];
	}

	else if (document.getElementById("istanbul-turkey")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009"];
		ydata = [3484.1, 4150.9, 5226.1, 6038.8, 7434.3, 7816.5, 8180.5, 8640.7, 8543, 8300.9];
	}

	else if (document.getElementById("veracruz-mexico")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009"];
		ydata = [3202.8, 3320.2, 3658.5, 3870, 3931.6, 3998.2, 4223.6, 4256.8, 4127.7];
	}

    // *********** Cohort 2 **************
    
    else if (document.getElementById("morocco")) {
			xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
			ydata = [466.1, 457.5, 466, 400.3, 417.1, 443.2, 399.5, 378.6, 413.3, 390.7, 350.4, 385.8];
		}
    
    else if (document.getElementById("moscow-russia")) {
			xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
			ydata = [17180.1, 15657.9, 15847.2, 15147.8, 14921.8, 14424.5, 13561.6, 13953.7, 13970.2, 14057.2, 13500.4, 14150.9];
		}
    
    else if (document.getElementById("london-uk")) {
			xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009"];
			ydata = [48216.1, 45586.5, 44642.9, 45232.1, 45491.6, 45658.1, 46746.5, 47138.2, 46333.1, 45648.8];
		}
    
    else if (document.getElementById("valencia-spain")) {
			xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
			ydata = [77.691, 90.408, 111.024, 102.224, 130.171, 138.917, 115.779, 152.773, 156.239, 171.758, 186.788];
		}
    
    else if (document.getElementById("qatar")) {
			xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
			ydata = [17.3, 20.7, 12.8, 20.9, 48.1, 39, 42.1, 48.3, 59.9, 64.2, 104.4, 111.3];
		}
    
    else if (document.getElementById("seoul-south-korea")) {
			xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
			ydata = [9571.8, 11007.7, 11734.5, 13402.9, 15255.6, 16395.8, 17909.9, 18470.1, 21090.8, 22280.3, 24106.4, 25592.7];
		}
    
    else if (document.getElementById("rio-de-janeiro-brazil")) {
			xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
			ydata = [6407.3, 7052.3, 7881.1, 8330.2, 9573, 9896.7, 10799.5, 11890.8, 12909.3, 12307.3, 12529.5, 13148.1];
		}
    
    else if (document.getElementById("singapore")) {
			xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
			ydata = [2361, 2434.3, 2631.9, 2939.4, 3384.3, 3611.2, 3838, 3793.3, 4069.3, 4187.8, 4377.3, 4542.8];
		}

    addGraph("carousel-example-generic", xlabels, ydata, "Published Papers/year", "icap-charts2");

    ////////////////////////
	//  STEM Chart
	////////////////////////
	xlabels = [];
	ydata = [];

	if (document.getElementById("andalusia-spain")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [43358, 45506, 43656, 43214, 42100, 40800, 41228, 39282, 42210, 43222, 45728, 50748];
	}

	else if (document.getElementById("finland")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [4374, 4430, 5098, 5652, 7064, 6878, 7040, 7612, 14068, 6802, 7978, 8234];
	}

	else if (document.getElementById("hangzhou-china")) {
		xlabels = [];
		ydata = []; 
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [8132, 8928, 8904, 8920, 10554, 10856, 10734, 9970, 10320, 11368, , 12032];
	}

	else if (document.getElementById("scotland")) {
		xlabels = ["2000","2001","2003","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [129497, 154085, 169198, 150412, 148374, 145529, 146065, 146698, 155414, 168103]; 
	}

	else if (document.getElementById("istanbul-turkey")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [28634, 32556, 33986, 33792, 34690, 36958, 38918, 44462, 49156, 53176, 50478, 61862];
	}

	else if (document.getElementById("veracruz-mexico")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [51566, 57910, 63358, 71052, 69898, 80360, 85058, 82866, 82114, 81034, 55532, 54240];
	}	
    
    // *********** Cohort 2 **************
    
    else if (document.getElementById("london-uk")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [103750.717, 121697.21, , 126167.1308, , 118446.62, 119534.21, 118775.35, 121269.27, 122825.83, 133470.16, 144132.3];
	}
    
    else if (document.getElementById("valencia-spain")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [49268, 53585, 53097, 54296, 52441, 49890, 49674, 48677, 51309, 54698, 58973, 71742];
	}
    
    else if (document.getElementById("seoul-south-korea")) {
    	xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [94684, 107631, 107613, 113630, 117056, 115584, 113132, 114150, 130468, 128202, 127170, 134211];
	}
    
    else if (document.getElementById("rio-de-janeiro-brazil")) {
		xlabels = ["2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [70781, 68608, 76190, 80680, 84454, 90326, 81642, 88212];
	}

	addGraph("carousel-example-generic", xlabels, ydata, "STEM Graduates/year", "stem-chart");

	////////////////////////
	// rd-chart
	////////////////////////
	xlabels = [];
	ydata = [];
	if (document.getElementById("andalusia-spain")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009", "2010"];
		ydata = [0.65, 0.59, 0.6, 0.85, 0.76, 0.84, 0.89, 1.02, 1.03, 1.1, 1.21];
	}

	else if (document.getElementById("finland")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009", "2010", "2011", "2012", "2013"];
		ydata = [3.34552, 3.316, 3.362, 3.4391, 3.4501, 3.476, 3.475, 3.471, 3.7007, 3.933, 3.87896, 3.78295, 3.55, 3.49];
	}

	else if (document.getElementById("hangzhou-china")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008"];
		ydata = [0.9027516, 0.950690803, 1.070033333, 1.133557842, 1.229891736, 1.324758053, 1.38830175, 1.395823262, 1.469858116];
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = ["2001","2003","2005","2007","2009"];
		ydata = [1.12108, 1.16896, 1.13693, 1.18567, 1.30137];
	}

	else if (document.getElementById("scotland")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008"];
		ydata = [1.381763423, 1.568380879, 1.64, 1.56, 1.5, 1.62, 1.44, 1.49, 1.49];
	}

	else if (document.getElementById("istanbul-turkey")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009", "2010"];
		ydata = [0.47909, 0.53779, 0.52594, 0.48311, 0.51831, 0.59104, 0.58016, 0.72241, 0.72518, 0.84902, 0.84343]; 
	}

	else if (document.getElementById("veracruz-mexico")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009"];
		ydata = [0.37273, 0.39433, 0.43617, 0.39614, 0.39964, 0.41183, 0.38612, 0.37019, 0.35059, 0.395];
	}
    
    // *********** Cohort 2 **************
    
	else if (document.getElementById("moscow-russia")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [1.22, 1.34, 1.41, 1.44, 1.28, 1.16, 1.17, 1.22, 1.18, 1.52, 1.4];
	}

	else if (document.getElementById("london-uk")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009"];
		ydata = [1.09325082, 0.985933514, 1.094424514, 1.006114683, 1.006818264, 0.91, 1.04, 1.02, 0.98, 1.01];
	}

	else if (document.getElementById("valencia-spain")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [0.71, 0.67, 0.77, 0.82, 0.89, 0.97, 0.94, 0.94, 1.04, 1.11, 1.08];
	}

	else if (document.getElementById("seoul-south-korea")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009"];
		ydata = [2.88, 3.17, 2.98, 3.28, 3.62, 3.69, 3.9, 4.21, 4.42, 4.71, 5.03];
	}

	else if (document.getElementById("rio-de-janeiro-brazil")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [1.01825, 1.0429, 0.98472, 0.95792, 0.89952, 0.97132, 1.00801, 1.09514, 1.11431, 1.16614, 1.16042];
	}

	else if (document.getElementById("singapore")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009"];
		ydata = [1.85105, 2.05725, 2.09776, 2.04845, 2.13241, 2.19493, 2.16326, 2.3686, 2.83565, 2.4277, 2.09299];
	}

	addGraph("carousel-example-generic", xlabels, ydata, "Gross R&amp;D Expenditure", "rd-chart");

	////////////////////////
	// iprop-chart
	////////////////////////
	xlabels = [];
	ydata = [];

	if(document.getElementById("andalusia-spain")) {
		xlabels = ["2000", "2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [5.32392, 4.48528, 4.72727, 4.54317, 4.37495, 4.85122, 5.03478, 4.49861, 4.15158, 4.32492, 3.88928];
	}

	else if(document.getElementById("finland")) {
		xlabels = ["2000", "2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [6.36111, 6.31782, 6.11765, 6.08277, 5.53035, 6.52752, 6.2384, 6.15169, 6.03422, 6.27737, 6.22653];
	}

	else if(document.getElementById("hangzhou-china")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010", "2011"];
		ydata = [2.95372, 3.63434, 3.36364, 3.59177, 3.2135, 3.21481, 3.4621, 4.18118, 3.93492, 4.02914, 4.00091];
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [5.29444, 5.60356, 5.62319, 6.01035, 5.87085, 6.19631, 5.7669, 5.78175, 6.06878, 5.61601, 5.96089];
	}

	else if(document.getElementById("scotland")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010", "2011"];
		ydata = [2.915, 2.7618, 2.8, 2.75097, 2.96, 3.1455, 3.58084, 2.59151, 2.73739, 2.47025, 2.94156];
	}

	else if(document.getElementById("istanbul-turkey")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010", "2011"];
		ydata = [6.36111, 6.31782, 6.11765, 6.08277, 5.53035, 6.52752, 6.2384, 6.15169, 6.03422, 6.27737, 6.22653];
	}

	else if (document.getElementById("veracruz-mexico")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [3.57373, 3.00467, 3.80583, 3.31286, 3.2008, 3.99957, 3.35261, 3.11961, 3.25923, 2.94326, 3.31397];
	}
    
    // *********** Cohort 2 **************
    
	else if (document.getElementById("morocco")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [3.5131, 3.93069, 4.02104, 3.13502, 3.72273, 3.93588, 2.90197, 3.29788, 3.46688];
	}

	else if (document.getElementById("moscow-russia")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [2.06002, 2.30662, 2.34733, 2.59501, 2.36195, 2.32949, 2.72839, 3.03849, 2.55293, 2.59997, 2.37818];
	}

	else if (document.getElementById("london-uk")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [6.01366, 6.4515, 6.13846, 6.14881, 6.08398, 6.19537, 5.77349, 4.95045, 5.53459, 5.47126, 5.86404];
	}

	else if (document.getElementById("valencia-spain")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [5.32392, 4.48528, 4.72727, 4.54317, 4.37495, 4.85122, 5.03478, 4.49861, 4.15158, 4.32492, 3.88928];
	}

	else if (document.getElementById("qatar")) {
		xlabels = ["2005","2006","2007","2008","2009","2010"];
		ydata = [4.3143, 5.19974, 5.26186, 5.08362, 4.75443, 4.89059];
	}

	else if (document.getElementById("seoul-south-korea")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [4.01919, 4.41503, 4.47059, 4.18897, 4.46251, 4.47011, 6.02384, 4.22452, 4.17267, 4.10158, 4.04144];
	}

	else if (document.getElementById("rio-de-janeiro-brazil")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [4.08999, 3.68732, 3.79365, 3.73237, 3.19801, 3.49742, 3.14838, 3.35214, 2.77405, 3.29801, 3.163];
	}

	else if (document.getElementById("singapore")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [5.56917, 5.71721, 5.91597, 5.65462, 6.08184, 6.10145, 6.42507, 6.26886, 6.16012, 6.08841, 6.10183];
	}

	else if (document.getElementById("puerto-rico")) {
		xlabels = ["2007","2008","2009","2010","2011"];
		ydata = [5.51939, 5.71615, 5.87961, 5.76124, 5.15544];
	}

	addGraph("carousel-example-generic", xlabels, ydata, "Intellectual Property Protection", "iprop-chart");

	////////////////////////
	//  gdpc-chart
	////////////////////////
	xlabels = [];
	ydata = [];
	if (document.getElementById("andalusia-spain")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [15763, 16756, 18108, 18992, 20144, 21427, 23692, 25122, 25691, 24576, 24087];
	}

	else if (document.getElementById("finland")) {
		xlabels = ["2000", "2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [25695, 26576, 27562, 27662, 29911, 30764, 33164, 36228, 38173, 35624, 36110];
	}

	else if (document.getElementById("hangzhou-china")) {
		xlabels = ["2005","2006","2007","2008","2009","2010", "2011"];
		ydata = [7809, 8953, 10033, 10771, 11569, 12840, 14177];
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007","2008","2009","2010", "2011", "2012"];
		ydata = [21135.84833, 22111.50752, 22904.03271, 23555.52654, 24634.31521, 25308.24094, 27068.19994, 28798.98905, 29008.34332, 29700.67752, 29813.8402, 30933.31805, 32219.46357];
	}

	else if (document.getElementById("scotland")) {
		xlabels = ["2000", "2001", "2002", "2003", "2004", "2005","2006","2007","2008","2009","2010"];
		ydata = [24095, 25483, 26630, 27694, 29653, 31022, 33357, 34258, 34605, 33336, 34215];
	}

	else if (document.getElementById("istanbul-turkey")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010", "2011"];
		ydata = [13575, 12547, 7803.01, 8255.23, 9335.53, 11116.96, 12116.07, 12891.57, 13107.55, 12460.79, 13577.11, 14615.53];
	}

	else if (document.getElementById("veracruz-mexico")) {
		xlabels = ["2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [6429, 7038, 7748, 8874, 9403, 10029, 9620, 9682];
	}

    // *********** Cohort 2 **************

	else if (document.getElementById("morocco")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [3514.98222, 3823.3304, 3968.221183, 4259.792016, 4541.989601, 4780.943297, 5260.351497, 5494.422674, 5857.493119, 6117.821396, 6341.157292, 6697.602072, 6896.909281, 7200.412368];
	}

	else if (document.getElementById("moscow-russia")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [];
	}

	else if (document.getElementById("london-uk")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [41557.04, 42162.46, 42583.04, 44359.4, 45252.14, 46935.13, 47444.21, 49255.33, 48869.57, 46752.26, 46532.13];
	}

	else if (document.getElementById("valencia-spain")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [23980.34, 24664.22, 24994.94, 25109.27, 25340.01, 25411.59, 26122.79, 26920.77, 27582.47, 25654.75, 25134.92];
	}

	else if (document.getElementById("qatar")) {
		xlabels = ["2005","2006","2007","2008","2009","2010"];
		ydata = [66493.76, 73863.43, 76185.73, 77571.89, 77567.62, 88221.51];
	}

	else if (document.getElementById("seoul-south-korea")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [19630.55, 20312.69, 22383.05, 22720.44, 23198.81, 24013.92, 25072.63, 26187.04, 26107.37, 25908.19, 26243.01];
	}

	else if (document.getElementById("rio-de-janeiro-brazil")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [8740.589943, 8932.322396, 9184.580846, 9352.558935, 10033.36866, 10559.66982, 11195.00842, 12073.07522, 12825.81608, 12767.24044, 13772.88467, 14300.74066, 14573.54514, 15033.78089];
	}

	else if (document.getElementById("singapore")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [40859.61296, 40296.26979, 42250.71813, 45675.84515, 50768.80929, 55012.85627, 59826.36627, 64276.06376, 63246.27856, 61466.19979, 70433.06464, 74593.94299, 75913.57036, 78744.12773];
	}

	else if (document.getElementById("puerto-rico")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012"];
		ydata = [26087.24424, 27027.27044, 28002.09185, 29212.0305, 30602.90741, 31001.53454, 31637.82573, 32288.49491, 32502.25025, 32288.57205, 32712.29994, 33580.60521, 34673.52913];
	}

	addGraph("carousel-example-generic", xlabels, ydata, "GDP per capita", "gdpc-chart");

	addList("carousel-example-generic", "Top Three Research Institutions", top_research_institutions);

	addString("carousel-example-generic", "Celebrated Regional Innovation", celebrated_regional_innovation);


	////////////////////////
	// sccorp-chart
	////////////////////////
	xlabels = [];
	ydata = [];
	if (document.getElementById("andalusia-spain")) {
		xlabels = ["2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [123595, 131054, 141830, 138879, 99473, 74333, 75885, 81027];
	}

	else if (document.getElementById("finland")) {
		xlabels = ["2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [7711, 8426, 10247, 13948, 14091, 12254, 12391, 12742];
	}

	else if (document.getElementById("hangzhou-china")) {
		xlabels = [];
		ydata = [];
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = ["2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [63266, 65590, 68071, 70624, 53512, 48358, 44898, 42447];
	}

	else if (document.getElementById("scotland")) {
		xlabels = ["2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [331265, 355520, 346968, 381189, 326013, 340170, 379628, 429363];
	}

	else if (document.getElementById("istanbul-turkey")) {
		xlabels = ["2004","2005","2006","2007","2008"];
		ydata = [36647, 42671, 48012, 50658, 45569];
	}

	else if (document.getElementById("veracruz-mexico")) {
		xlabels = ["2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [35081, 40398, 43899, 49050, 50392, 60179, 67598, 65016];
	}

	// *********** Cohort 2 **************

	else if (document.getElementById("morocco")) {
		xlabels = ["2004","2005","2006","2007","2008","2009"];
		ydata = [9852,11292,17523,24676,26280,26166];
	}

	else if (document.getElementById("moscow-russia")) {
		xlabels = ["2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [102752,483970,419318,371109,391341,235449,235339,84396];
	}

	else if (document.getElementById("london-uk")) {
		xlabels = ["2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [331265,355520,346968,381189,326013,340170,379628,429363];
	}

	else if (document.getElementById("valencia-spain")) {
		xlabels = ["2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [123595,131054,141830,138879,99473,74333,75885,81027];
	}

	else if (document.getElementById("qatar")) {
		xlabels = ["2004","2005","2006","2007","2008","2009","2010"];
		ydata = [];
	}

	else if (document.getElementById("seoul-south-korea")) {
		xlabels = ["2006","2007","2008","2009","2010","2011"];
		ydata = [50289,53227,50505,56337,60593,65973];
	}

	else if (document.getElementById("rio-de-janeiro-brazil")) {
		xlabels = ["2004","2005","2006","2007","2008","2009"];
		ydata = [236072,246722,236172,271996,315066,315645];
	}

	else if (document.getElementById("singapore")) {
		xlabels = ["2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [17151,19497,21495,25903,25327,26414,29798,32308];
	}

	else if (document.getElementById("puerto-rico")) {
		xlabels = ["2004","2005","2006","2007","2008","2009","2010"];
		ydata = [];
	}

	addGraph("carousel-example-generic-2", xlabels, ydata, "S &amp; C Corps Incorporated/year", "sccorp-chart");

	////////////////////////
	// earlyentrep-chart
	////////////////////////
	xlabels = [];
	ydata = [];
	if (document.getElementById("andalusia-spain")) {
		xlabels = ["2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011"];
		ydata = [6.3, 4.6, 6.6, 5.1, 5.7, 7.3, 7.6, 7, 5.1, 4.3, 5.8];
	}

	else if (document.getElementById("finland")) {
		xlabels = ["2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011"];
		ydata = [8.2, 4.6, 3.1, 4.4, 4.9, 5, 6.9, 7.3, 5.2, 5.7, 6.3];
	}

	else if (document.getElementById("hangzhou-china")) {
		xlabels = ["2002", "2003", "2005", "2006", "2007", "2009", "2010", "2011"];
		ydata = [12.1, 12.9, 13.7, 16, 16.4, 18.8, 14.4, 24];
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = ["2001", "2002", "2003", "2004", "2005"];
		ydata = [15.5, 14, 13.6, 14.7, 17.6];
	}

	else if (document.getElementById("scotland")) {
		xlabels = ["2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011"];
		ydata = [6.5, 5.4, 6.4, 6.2, 6.2, 5.8, 5.5, 5.9, 5.7, 6.4, 7.3];
	}

	else if (document.getElementById("istanbul-turkey")) {
		xlabels = ["2006", "2007", "2008", "2010", "2011"];
		ydata = [6.1, 5.6, 6, 8.6, 11.9];
	}

	else if (document.getElementById("veracruz-mexico")) {
		xlabels = ["2001", "2002", "2005", "2006", "2008", "2010", "2011"];
		ydata = [17.9, 12.4, 5.9, 5.3, 13.1, 10.5, 9.6];
	}

	// *********** Cohort 2 **************

	else if (document.getElementById("morocco")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [];
	}

	else if (document.getElementById("moscow-russia")) {
		xlabels = ["2006","2007","2008","2009","2010"];
		ydata = [4.8,2.7,3.5,3.9,3.9,4.6,4.3,5.8];
	}

	else if (document.getElementById("london-uk")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [6.5,5.4,6.4,6.2,6.2,5.8,5.5,5.9,5.7,6.4,7.3,9,7.1];
	}

	else if (document.getElementById("valencia-spain")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [6.3,4.6,6.6,5.1,5.7,7.3,7.6,7,5.1,4.3,5.8,5.7,5.2];
	}

	else if (document.getElementById("qatar")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [];
	}

	else if (document.getElementById("seoul-south-korea")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [14.3,14.5,,,,,,10,7,6.6,7.8,6.6,6.9];
	}

	else if (document.getElementById("rio-de-janeiro-brazil")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [13.8,13.5,12.9,13.5,11.3,11.7,12.7,12,15.3,17.5,14.9,15.4,17.3];
	}

	else if (document.getElementById("singapore")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [6.1,5.9,4.9,5.7,7.2,4.8,,,,,6.6,11.6,10.7];
	}

	else if (document.getElementById("puerto-rico")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [];
	}

	addGraph("carousel-example-generic-2", xlabels, ydata, "Total Early-Stage Entrepreneurship", "earlyentrep-chart");

	////////////////////////
	// vcinv-chart
	////////////////////////
	xlabels = [];
	ydata = [];
	if (document.getElementById("andalusia-spain")) {
		xlabels = ["2003", "2004", "2005", "2006","2007","2008","2009","2010", "2011", "2012", "2013"];
		ydata = [9, 2, 4, 2, 3, 2, 4, 7, 5, 3, 3];
	}

	else if (document.getElementById("finland")) {
		xlabels = ["2003", "2004", "2005", "2006","2007","2008","2009","2010", "2011", "2012", "2013"];
		ydata = [267, 190, 229, 260, 185, 103, 39, 71, 77, 53, 48];
	}

	else if (document.getElementById("hangzhou-china")) {
		xlabels = ["2003", "2004", "2005", "2006","2007","2008","2009","2010", "2011", "2012", "2013"];
		ydata = [2, 2, 4, 4, 8, 12, 17, 17, 12, 9, 10];
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = ["2003", "2004", "2005", "2006", "2007","2008","2009","2010","2011","2012","2013"];
		ydata = [12, 26, 24, 33, 46, 29, 18, 20, 15, 20, 14];
	}

	else if (document.getElementById("scotland")) {
		xlabels = ["2003", "2004", "2005", "2006","2007","2008","2009","2010", "2011", "2012", "2013"];
		ydata = [13, 11, 12, 15, 11, 19, 12, 11, 12, 22, 12];
	}

	else if (document.getElementById("istanbul-turkey")) {
		xlabels = ["2003", "2004", "2005", "2006","2007","2008","2009","2010", "2011", "2012", "2013"];
		ydata = [2, 2, 4, 8, 16, 11, 6, 20, 27, 26, 10];
	}

	else if (document.getElementById("veracruz-mexico")) {
		xlabels = ["2003","2004","2005","2006","2007","2008","2009","2010","2011","2012"];
		ydata = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	}

	// *********** Cohort 2 **************

	else if (document.getElementById("morocco")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [];
	}

	else if (document.getElementById("moscow-russia")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [];
	}

	else if (document.getElementById("london-uk")) {
		xlabels = ["2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [13, 11, 12, 15, 11, 19, 12, 11, 12, 22, 12, ];
	}

	else if (document.getElementById("valencia-spain")) {
		xlabels = ["2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [9, 2, 4, 2, 3, 2, 4, 7, 5, 3, 3];
	}

	else if (document.getElementById("qatar")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [];
	}

	else if (document.getElementById("seoul-south-korea")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [];
	}

	else if (document.getElementById("rio-de-janeiro-brazil")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [];
	}

	else if (document.getElementById("singapore")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [];
	}

	else if (document.getElementById("puerto-rico")) {
		xlabels = ["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [];
	}

	addGraph("carousel-example-generic-2", xlabels, ydata, "Venture Capital Investments in Region/year", "vcinv-chart");

	////////////////////////
	// busiday-chart
	////////////////////////
	xlabels = [];
	ydata = [];
	if (document.getElementById("andalusia-spain")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [114, 114, 114, 114, 114, 47, 47, 47, 47, 47, 47];
	}

	else if (document.getElementById("finland")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [31, 31, 31, 31, 14, 14, 14, 14, 14, 14, 14];
	}

	else if (document.getElementById("hangzhou-china")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [48, 48, 48, 48, 48, 48, 35, 35, 40, 37, 37];
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = ["2001", "2002", "2003", "2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [12, 12, 12, 12, 12, 12, 12, 12, 1, 1, 1];
	}

	else if (document.getElementById("scotland")) {
		xlabels = ["2000", "2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [0, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13];
	}

	else if (document.getElementById("istanbul-turkey")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [38, 38, 38, 38, 6, 6, 6, 6, 6, 6, 6];
	}

	else if (document.getElementById("veracruz-mexico")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [58, 58, 58, 58, 58, 58, 27, 27, 28, 13, 13];
	}

	// *********** Cohort 2 **************

	else if (document.getElementById("morocco")) {
		xlabels = ["2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [36,36,36,12,12,12,12,12,12];
	}

	else if (document.getElementById("moscow-russia")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [44,44,44,44,39,35,30,30,30,30,30];
	}

	else if (document.getElementById("london-uk")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [13,13,13,13,13,13,13,13,13,13,13];
	}

	else if (document.getElementById("valencia-spain")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [114,114,114,114,114,47,47,47,47,47,47];
	}

	else if (document.getElementById("qatar")) {
		xlabels = ["2005","2006","2007","2008","2009","2010"];
		ydata = [6,6,6,6,6,6];
	}

	else if (document.getElementById("seoul-south-korea")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [17,17,17,17,17,17,17,17,17,14,14];
	}

	else if (document.getElementById("rio-de-janeiro-brazil")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [152,152,152,152,152,152,152,152,152,120,120];
	}

	else if (document.getElementById("singapore")) {
		xlabels = ["2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011"];
		ydata = [8,8,8,8,8,6,6,5,4,3,3];
	}

	else if (document.getElementById("puerto-rico")) {
		xlabels = ["2007","2008","2009","2010","2011"];
		ydata = [7,7,7,7,7];
	}

	addGraph("carousel-example-generic-2", xlabels, ydata, "Number of days to start a business", "busiday-chart");

	////////////////////////
	// gdpcap-chart
	////////////////////////
	xlabels = [];
	ydata = [];
	if (document.getElementById("andalusia-spain")) {
		xlabels = ["2000", "2001", "2002", "2003", "2004", "2005", "2006","2007","2008","2009","2010"];
		ydata = [15763, 16756, 18108, 18992, 20144, 21427, 23692, 25122, 25691, 24576, 24087];
	}

	else if (document.getElementById("finland")) {
		xlabels = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007","2008","2009","2010"];
		ydata = [25695, 26576, 27562, 27662, 29911, 30764, 33164, 36228, 38173, 35624, 36110];
	}

	else if (document.getElementById("hangzhou-china")) {
		xlabels = ["2005", "2006","2007","2008","2009","2010", "2011"];
		ydata = [7809, 8953, 10033, 10771, 11569, 12840, 14177];
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007","2008","2009", "2010", "2011", "2012"];
		ydata = [21135.84833 , 22111.50752, 22904.03271, 23555.52654, 24634.31521, 25308.24094, 27068.19994, 28798.98905, 29008.34332, 29700.67752, 29813.8402, 30933.31805, 32219.46357];
	}

	else if (document.getElementById("scotland")) {
		xlabels = ["2000", "2001", "2002", "2003", "2004", "2005", "2006","2007","2008","2009","2010"];
		ydata = [24095, 25483, 26630, 27694, 29653, 31022, 33357, 34258, 34605, 33336, 34215];
	}

	else if (document.getElementById("istanbul-turkey")) {
		xlabels = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007","2008","2009","2010", "2011"];
		ydata = [13575, 12547, 7803.01, 8255.23, 9335.53, 11116.96, 12116.07, 12891.57, 13107.55, 12460.79, 13577.11, 14615.53];
	}

	else if (document.getElementById("veracruz-mexico")) {
		xlabels = ["2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [6429, 7038, 7748, 8874, 9403, 10029, 9620, 9682];
	}

	// *********** Cohort 2 **************

	else if (document.getElementById("morocco")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [3514.98222, 3823.3304, 3968.221183, 4259.792016, 4541.989601, 4780.943297, 5260.351497, 5494.422674, 5857.493119, 6117.821396, 6341.157292, 6697.602072, 6896.909281, 7200.412368];
	}

	else if (document.getElementById("moscow-russia")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [];
	}

	else if (document.getElementById("london-uk")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [41557.04, 42162.46, 42583.04, 44359.4, 45252.14, 46935.13, 47444.21, 49255.33, 48869.57, 46752.26, 46532.13];
	}

	else if (document.getElementById("valencia-spain")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [23980.34, 24664.22, 24994.94, 25109.27, 25340.01, 25411.59, 26122.79, 26920.77, 27582.47, 25654.75, 25134.92];
	}

	else if (document.getElementById("qatar")) {
		xlabels = ["2005","2006","2007","2008","2009","2010"];
		ydata = [66493.76, 73863.43, 76185.73, 77571.89, 77567.62, 88221.51];
	}

	else if (document.getElementById("seoul-south-korea")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010"];
		ydata = [19630.55, 20312.69, 22383.05, 22720.44, 23198.81, 24013.92, 25072.63, 26187.04, 26107.37, 25908.19, 26243.01];
	}

	else if (document.getElementById("rio-de-janeiro-brazil")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [8740.589943, 8932.322396, 9184.580846, 9352.558935, 10033.36866, 10559.66982, 11195.00842, 12073.07522, 12825.81608, 12767.24044, 13772.88467, 14300.74066, 14573.54514, 15033.78089];
	}

	else if (document.getElementById("singapore")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [40859.61296, 40296.26979, 42250.71813, 45675.84515, 50768.80929, 55012.85627, 59826.36627, 64276.06376, 63246.27856, 61466.19979, 70433.06464, 74593.94299, 75913.57036, 78744.12773];
	}

	else if (document.getElementById("puerto-rico")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012"];
		ydata = [26087.24424, 27027.27044, 28002.09185, 29212.0305, 30602.90741, 31001.53454, 31637.82573, 32288.49491, 32502.25025, 32288.57205, 32712.29994, 33580.60521, 34673.52913];
	}
			
	addGraph("carousel-example-generic-2", xlabels, ydata, "GDP/capita", "gdpcap-chart");

	addList("carousel-example-generic-2", "Top 3 business parks, innovation hubs or accelerators", top_business_parks);

	addString("carousel-example-generic-2", "Celebrated Regional Entrepreneur", celebrated_regional_entrepreneur);

	////////////////////////
	// doluniv-chart
	////////////////////////
	xlabels = [];
	ydata = [];
	if (document.getElementById("andalusia-spain")) {
		xlabels = [];
		ydata = [];
	}

	else if (document.getElementById("finland")) {
		xlabels = [];
		ydata = [];
	}

	else if (document.getElementById("hangzhou-china")) {
		xlabels = [];
		ydata = [];
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007","2008","2009", "2011"];
		ydata = [31175, 31571, 31581, 32154, 37882, 39459, 41797, 41973, 39950, 42209, 46163];
	}

	else if (document.getElementById("scotland")) {
		xlabels = [];
		ydata = [];
	}

	else if (document.getElementById("istanbul-turkey")) {
		xlabels = [];
		ydata = [];
	}

	else if (document.getElementById("veracruz-mexico")) {
		xlabels = [];
		ydata = [];
	}

	addGraph("carousel-example-generic-3", xlabels, ydata, "$ Invested in University Startups (USD)/year", "doluniv-chart");
	
	////////////////////////
	// phdgrad-chart
	////////////////////////
	xlabels = [];
	ydata = [];	
	if (document.getElementById("andalusia-spain")) {
		xlabels = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011"];
		ydata = [213585 ,217802, 218884, 216852, 210603, 202848, 202642, 199767, 210577, 224920, 247100, 284461];
	}

	else if (document.getElementById("finland")) {
		xlabels = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011"];
		ydata = [27782, 30686, 34253, 37486, 38819, 39119, 40416, 43279, 60023, 44870, 50890, 51380];
	}

	else if (document.getElementById("hangzhou-china")) {
		xlabels = ["2010", "2011"];
		ydata = [3719067, 4280780];
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = [];
		ydata = [];
	}

	else if (document.getElementById("scotland")) {
		xlabels = ["2000", "2001", "2003", "2005", "2006", "2007", "2008", "2009", "2010", "2011"];
		ydata = [393399.711, 425733.223, 452707.5739, 498184.95, 514135.13, 521486.57, 536723, 538279, 575197, 618694];
	}

	else if (document.getElementById("istanbul-turkey")) {
		xlabels = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011"];
		ydata = [131212, 156404, 159380, 165469, 215603, 180856, 235884, 261070, 280875, 303253, 341558, 321720];
	}

	else if (document.getElementById("Veracruz, Mexico")) {
		xlabels = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011"];
		ydata = [288055, 297981, 323600, 320727, 324013, 357931, 389575, 398017, 396281, 424170, 437707, 465174];
	}
			
	addGraph("carousel-example-generic-3", xlabels, ydata, "# New PhD Graduates/year", "phdgrad-chart");

	////////////////////////
	// totemp-chart
	////////////////////////
	xlabels = [];
	ydata = [];
	if (document.getElementById("andalusia-spain")) {
		xlabels = ["2007", "2008", "2009", "2010", "2011", "2012"];
		ydata = [20.356, 20.258, 18.888, 18.457, 18.105, 17.282];
	}

	else if (document.getElementById("finland")) {
		xlabels = ["2007", "2008", "2009", "2010", "2011", "2012"];
		ydata = [2.492, 2.531, 2.457, 2.447, 2.474, 2.483];
	}

	else if (document.getElementById("hangzhou-china")) {
		xlabels = [];
		ydata = [];
	}

	else if (document.getElementById("new-zealand")) {
		xlabels = ["2007","2008","2009", "2010", "2011", "2012"];
		ydata = [2.175, 2.189, 2.165, 2.181, 2.216, 2.217];
	}

	else if (document.getElementById("scotland")) {
		xlabels = ["2007", "2008", "2009", "2010", "2011", "2012"];
		ydata = [29.228, 29.44, 28.96, 29.019, 29.166, 29.519];
	}

	else if (document.getElementById("istanbul-turkey")) {
		xlabels = [];
		ydata = [];
	}

	else if (document.getElementById("veracruz-mexico")) {
		xlabels = [];
		ydata = [];
	}

	// *********** Cohort 2 **************

	else if (document.getElementById("morocco")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [];
	}

	else if (document.getElementById("moscow-russia")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [];
	}

	else if (document.getElementById("london-uk")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [27.484, 27.711, 27.92, 28.183, 28.481, 28.77, 29.025, 29.228, 29.44, 28.96, 29.019, 29.166, 29.519, 29.896];
	}

	else if (document.getElementById("valencia-spain")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [15.506, 16.146, 16.63, 17.296, 17.971, 18.973, 19.748, 20.356, 20.258, 18.888, 18.457, 18.105, 17.282, 16.75];
	}

	else if (document.getElementById("qatar")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [];
	}

	else if (document.getElementById("seoul-south-korea")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [21.156, 21.572, 22.169, 22.139, 22.557, 22.856, 23.151, 23.433, 23.577, 23.506, 23.829, 24.244, 24.681, 25.067];
	}

	else if (document.getElementById("rio-de-janeiro-brazil")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [];
	}

	else if (document.getElementById("singapore")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [2.134, 2.063, 2.053, 2.065, 2.11, 2.293, 2.354, 2.473, 2.68, 2.739, 2.86, 2.957, 3.073, 3.171];
	}

	else if (document.getElementById("puerto-rico")) {
		xlabels = ["2000","2001", "2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"];
		ydata = [];
	}

	addGraph("carousel-example-generic-3", xlabels, ydata, "Total Employment/ year", "totemp-chart");

	////////////////////////
	// uni-spinoffs
	////////////////////////
	xlabels = [];
	ydata = [];
	addGraph("carousel-example-generic-3", xlabels, ydata, "# New University Spin Offs/year", "uni-spinoffs");

	////////////////////////
	// health-grads
	////////////////////////
	xlabels = [];
	ydata = [];
	addGraph("carousel-example-generic-3", xlabels, ydata, "# Health-Related Graduates/year", "health-grads");

	////////////////////////
	// hightech-jobs
	////////////////////////
	xlabels = [];
	ydata = [];
	addGraph("carousel-example-generic-3", xlabels, ydata, "# high-tech jobs created/ year", "hightech-jobs");

	////////////////////////
	// foreign-emp
	////////////////////////
	xlabels = [];
	ydata = [];
	addGraph("carousel-example-generic-3", xlabels, ydata, "Employment by foreign-owned firms/ year", "foreign-emp");
	
  
  // Configure the carousel in the dashboard to slide automatically: http://getbootstrap.com/javascript/#carousel
  $('.carousel').carousel({
      interval: 3000
  })
});
