window.APP_DATA = {
  selectedApp: {
    name: 'Properly Formatted App Name',
    description: 'Brief description of app.',
    challenge: ``,
    approach: ``,
    results: ``,
    images: ['path/to/images'],
  },
  imagePanelVisible: false,
  descriptionPanelVisible: true,
  focusStem: {
    templatePath: 'templates/FSNG.html',
    name: 'FocuSStem NextGen',
    description: 'Medical Simulation in Virtual Reality',
    challenge: `The FocuSStem NextGen initiative at the Karmanos Cancer Institute introduces underrepresented students in Southeastern Michigan to STEM careers.

	  When COVID-19 forced the program to cancel its in-person summer intensive, the FocuSStem team turned to CrossComm to build them an immersive VR experience that simulated real-world healthcare scenarios`,
    approach: `CrossComm built a multi-user VR application that could simultaneously accommodate a cohort of over 15 students and mentors. The app featured three medical simulations, including an ICU, operating room (OR), and medical lab.

	  Despite being geographically distant, students could collaborate with one another in the same simulated space as they worked through realistic medical scenarios such as cleaning chemical spills in the lab or making surgical cuts on patients in the OR`,
    results: `While many summer programs were forced to cancel due to COVID-19, the FocuSStem NextGen Summer Intensive was able to successfully pivot. The VR app provided students with an enriching educational experience that fostered collaboration and experiential learning`,
    images: [
      'img/project-screenshots/FocuSStem/focusstem-01.png',
      'images/project-screenshots/FocuSStem/focusstem-02.png',
      'images/project-screenshots/FocuSStem/focusstem-06.png',
      'images/project-screenshots/FocuSStem/focusstem-03.png',
      'images/project-screenshots/FocuSStem/focusstem-04.png',
      'images/project-screenshots/FocuSStem/focusstem-05.png',
    ],
    imageScale: '.75 .75 .75',
  },
  wellAware: {
    templatePath: 'templates/WellAware.html',
    name: 'Well Aware',
    description: 'Using Machine Learning To Test Water Quality',
    challenge: `Unlike piped water, private wells are not regulated by the U.S. government, making private well owners solely responsible for testing and treating their water

	  Researchers at the UNC Gillings School of Global Public Health sought to build a mobile app to help well owners test their drinking water for pollutants.`,
    approach: `CrossComm built a mobile app to take and analyze photos of water test kits to determine if microbes, lead, or arsenic were present.

	  The microbe test features a machine learning algorithm that becomes smarter with each use. The arsenic and lead tests use computer vision and gradient descent to determine color distributionson the test strips. These distributions are then averaged and fed into the UNC team’s regression model for further analysis`,
    results: `The app CrossComm built effectively utilized machine learning and computer vision to produce accurate results when analyzing water test kits.

	  The UNC researchers hope to eventually make the app open source and globally available so that any community can use it to test questionable or vulnerable drinking water sources`,
    images: [
      'images/project-screenshots/WellAware/wellaware-01.png',
      'images/project-screenshots/WellAware/wellaware-02.png',
      'images/project-screenshots/WellAware/wellaware-03.png',
      'images/project-screenshots/WellAware/wellaware-04.png',
      'images/project-screenshots/WellAware/wellaware-05.png',
      'images/project-screenshots/WellAware/wellaware-06.png',
    ],
    imageScale: '.325 .75 .75',
  },
  baseTemplate: {
    templatePath: 'templates/Lobby.html',
    name: 'Properly Formatted App Name',
    description: 'Breif description of app.',
    challenge: ``,
    approach: ``,
    results: ``,
    images: ['path/to/images'],
  },
};
