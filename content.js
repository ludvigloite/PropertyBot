function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  textArea.style.width = '2em';
  textArea.style.height = '2em';

  textArea.style.padding = 0;

  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}



chrome.runtime.onMessage.addListener(function (request){
	console.log("pressed button");

	var finnKode = document.getElementsByClassName("u-no-break u-pl8")[0].textContent.substring(0,9);
	var sistEndret = document.getElementsByClassName("u-no-break u-pl8")[1].textContent;

	dtList = document.getElementsByTagName("dt");
	ddList = document.getElementsByTagName("dd");

	for (let i = 0; i < dtList.length; i++) {
		if (dtList[i].textContent == "Totalpris"){
			var totalPris = ddList[i].textContent.replace("kr","").replace(" ","");
			console.log(totalPris)
		}
		else if (dtList[i].textContent == "Primærrom"){
			var primaerRom = ddList[i].textContent.replace(" m²","");
		}
		else if (dtList[i].textContent == "Bruksareal"){
			var bruksRom = ddList[i].textContent.replace(" m²","");
		}
		else if (dtList[i].textContent == "Byggeår"){
			var byggeAar = ddList[i].textContent;
		}
		else if (dtList[i].textContent == "Boligtype"){
			var boligType = ddList[i].textContent;
		}
		else if (dtList[i].textContent == "Soverom"){
			var antallSov = ddList[i].textContent;
		}
		else if (dtList[i].textContent == "Rom"){
			var antallRom = ddList[i].textContent;
		}
		else if (dtList[i].textContent == "Tomteareal"){
			var tomteAreal = ddList[i].textContent.match(/\d/g).join("");
		}
		else if (dtList[i].textContent == "Kommunale avg."){
			var kommunaleAvg = ddList[i].textContent.match(/\d/g).join("");
		}
		else if (dtList[i].textContent == "Felleskost/mnd."){
			var fellesKost = ddList[i].textContent.match(/\d/g).join("");
		}
	}

	

	var omraade = "";

	var adresse = document.getElementsByClassName("u-caption")[0].textContent;
	if (document.getElementsByClassName("u-t3 u-display-block")[0]){
		omraade = document.getElementsByClassName("u-t3 u-display-block")[0].textContent;
	}
	
	var tittel = document.getElementsByClassName("u-t2")[0].textContent;
	var bildeUrl = document.getElementsByClassName("img-format__img u-border-radius-8px")[0].src;
	/*var meglerhus = document.getElementsByClassName("ProfileBox-module_companyName__3JhW0 u-mb16")[0].textContent;
	var megler = document.getElementsByClassName("u-mb4")[0].textContent;
	var meglerTlf = document.getElementsByClassName("Flex-module_flex__3JDMW u-mb16")[0].textContent;
	*/


	//var visning = document.getElementsByTagName("dd")[17].textContent+" "+document.getElementsByTagName("dd")[18].textContent
	//Visning må nok debugges. Er ikke alltid visning er oppført osv. Mulig med flere visingsdager.

	//var tomteAreal = tomteArealTxt.match(/\d/g);
	//tomteAreal = tomteAreal.join("");

	var finnUrl = "https://www.finn.no/realestate/homes/ad.html?finnkode="+finnKode;
	var finnLink = "=HYPERLINK(\""+finnUrl+"\";"+finnKode+")"

	var fastKostAar = "";

	if (kommunaleAvg){
		fastKostAar = kommunaleAvg;
		console.log("kommunale Avg!")
	}else{
		fastKostAar = parseInt(fellesKost)*12;
	}

	var this_day = new Date();
	var dd = String(this_day.getDate()).padStart(2, '0');
	var mm = String(this_day.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = this_day.getFullYear();

	var datoLagtTil = dd + '/' + mm + '/' + yyyy;


	var copyText = bildeUrl+"\t"+" "+"\t"+tittel+"\t"+finnLink+"\t"+omraade+"\t"+adresse+"\t"+bruksRom+"\t"+primaerRom+"\t"+tomteAreal+"\t"+byggeAar+"\t"+boligType+"\t"+totalPris+"\t"+datoLagtTil+"\t"+sistEndret+"\t"+fastKostAar+"\t"+antallRom+"\t"+antallSov;

	copyTextToClipboard(copyText);


})	
