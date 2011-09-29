// Ray Cast Point in Polygon extension for Google Maps GPolygon
// App Delegate Inc <htttp://appdelegateinc.com> 2010


if (!google.maps.Polygon.prototype.getBounds)
{
	google.maps.Polygon.prototype.getBounds = function() {
	  
		var path = this.getPath();
		
		var slat, blat = path.getAt(0).lat();
		var slng, blng = path.getAt(0).lng();
	      
		for (var i = 1; i < path.getLength(); i++) {
		  var e = path.getAt(i);
		  slat = ((slat < e.lat())?slat:e.lat());
		  blat = ((blat > e.lat())?blat:e.lat());
		  slng = ((slng < e.lng())?slng:e.lng());
		  blng = ((blng > e.lng())?blng:e.lng());
		}      
	      
		return new google.maps.LatLngBounds(new google.maps.LatLng(slat, slng), new google.maps.LatLng(blat, blng));
	  
	}
}




GPolygon.prototype.containsLatLng = function(latLng) {
	// Exclude points outside of bounds as there is no way they are in the poly
	var bounds = this.getBounds();
	
	if(bounds != null && !bounds.contains(latLng)) {
		return false;
	}
	
	// Raycast point in polygon method
	var numPoints = this.getPath().getLength()();
	var inPoly = false;
	var i;
	var j = numPoints-1;
	
	for(var i=0; i < numPoints; i++) { 
		var vertex1 = this.getPath().getAt(i);
		var vertex2 = this.getPath().getAt(j);
		
		if (vertex1.lng() < latLng.lng() && vertex2.lng() >= latLng.lng() || vertex2.lng() < latLng.lng() && vertex1.lng() >= latLng.lng())	 {
			if (vertex1.lat() + (latLng.lng() - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < latLng.lat()) {
				inPoly = !inPoly;
			}
		}
		
		j = i;
	}
	
	return inPoly;
};