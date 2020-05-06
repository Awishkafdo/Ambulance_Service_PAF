$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
	{
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

//SAVE -----------------------------------
$(document).on("click", "#btnSave", function(event)
{
	//Clear alerts------------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	//Form validation---------------------
	var status = validateItemForm();
	if (status != true)
	{
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	
	//If valid----------------------------
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
	{
			 url : "AmbulanceAPI",
			 type : type,
			 data : $("#formAmbulance").serialize(),
			 dataType : "text",
			 complete : function(response, status)
			 {
			 onItemSaveComplete(response.responseText, status);
			 }
	});
});

function onItemSaveComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	else if (status == "error")
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} 
	else
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidItemIDSave").val("");
	$("#formAmbulance")[0].reset();
}


//UPDATE=======================================
$(document).on("click", ".btnUpdate", function(event)
{
	$("#hidItemIDSave").val($(this).closest("tr").find('#hidItemIDUpdate').val());
	$("#vBrand").val($(this).closest("tr").find('td:eq(0)').text());
	$("#vModel").val($(this).closest("tr").find('td:eq(1)').text());
	$("#aPhone").val($(this).closest("tr").find('td:eq(2)').text());
});

//REMOVE =======================================
$(document).on("click", ".btnRemove", function(event)
{
	$.ajax(
	{
		url : "AmbulanceAPI",
		type : "DELETE",
		data : "id=" + $(this).data("id"),
		dataType : "text",
		complete : function(response, status)
		{
			onItemDeleteComplete(response.responseText, status);
		}
	});
});

function onItemDeleteComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	else if (status == "error")
	{
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} 
	else
	{
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}



//CLIENT-MODEL=================================
function validateItemForm()
{
	// NAME
	if ($("#vBrand").val().trim() == "")
	{
		return "Insert Brand.";
	} 
	// MODEL-------------------------------
	if ($("#vModel").val().trim() == "")
	{
		return "Insert Model.";
	}
	// PHONE-------------------------------
	if ($("#aPhone").val().trim() == "")
	{
		return "Insert Phone number.";
	}
	var tmpPhone = $("#aPhone").val().trim();
	if (!$.isNumeric(tmpPhone))
	 {
	 return "Insert a numerical value for phone number.";
	 } 
	
return true;
}

