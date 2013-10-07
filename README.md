Marionette.RapidProto
=====================

A set of Pre-setup MarionetteJS Objects for Rapid Prototyping

Initialization : 

	 window.idAttr = ''; // ID of your list model
	 window.fetchurl = ''; //relative url of rest service to call
     window.showList = true; //to show the list in the region

Needed Regions : 
	
	App.addRegions({
	    listRegion: "#ListRegion",
	    editRegion: "#EditRegion",
	    displayRegion: "#DisplayRegion"
	});

Needed templates : 

	<script type='text/template' id='no-item-view-template'></script>
	<script type='text/template' id='item-view-template'></script>
    <script type='text/template' id='item-display-view-template'></script>


Initialize the app
	$(document).ready(function () {
        App.start();
    });