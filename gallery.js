// ===========================
// Project Galleries
// ===========================

const projectGalleries = {

    co2: [
	  
        "images/COMonitoringSystem/DataFlow.gif",
		"images/COMonitoringSystem/Picture1.png",
		"images/COMonitoringSystem/Picture2.png",
		"images/COMonitoringSystem/Picture3.png",
		"images/COMonitoringSystem/Picture4.png",
		"images/COMonitoringSystem/Picture5.png",
		"images/COMonitoringSystem/Picture6.png",
		"images/COMonitoringSystem/Picture7.png",
		"images/COMonitoringSystem/Picture8.png",
		"images/COMonitoringSystem/Picture9.jpg",
		"images/COMonitoringSystem/Picture10.jpg"
		
    ],
	
	ticketsys: [
	  
        
		"images/OnlineSupportTicketSystem/Picture1.jpg",
		"images/OnlineSupportTicketSystem/Picture2.jpg",
		"images/OnlineSupportTicketSystem/Picture3.png",
		"images/OnlineSupportTicketSystem/Picture4.jpg",
		"images/OnlineSupportTicketSystem/Picture5.jpg",
		"images/OnlineSupportTicketSystem/Picture6.jpg",
		"images/OnlineSupportTicketSystem/Picture7.jpg",
		"images/OnlineSupportTicketSystem/Picture8.jpg",
		"images/OnlineSupportTicketSystem/Picture9.jpg",
		"images/OnlineSupportTicketSystem/Picture10.jpg"
		
    ],
	PosSystem: [
	  
        
		"images/PosSystem/Picture1.png",
		"images/PosSystem/Picture2.png",
		"images/PosSystem/Picture3.png",
		"images/PosSystem/Picture4.png",
		"images/PosSystem/Picture5.jpg",
		"images/PosSystem/Picture6.png",
		"images/PosSystem/Picture7.png"
		
    ],
	flood: [
	  
        
		"images/floodApp/Picture1.jpg",
		"images/floodApp/Picture2.jpg",
		"images/floodApp/Picture3.jpg",
		"images/floodApp/Picture4.jpg",
		"images/floodApp/Picture5.jpg"
		
    ],

    

};

// ===========================
// Create Gallery
// ===========================

function createGallery(elementId, images) {

    const container = document.getElementById(elementId);

    // Stop if container doesn't exist
    if (!container) return;

    let html = '<div class="project-gallery">';

    images.forEach((img, index) => {

        html += `
            <img
                src="${img}"
                alt="Project Image ${index + 1}"
                loading="lazy"
                onclick='openGallery(${JSON.stringify(images)}, ${index})'>
        `;

    });

    html += '</div>';

    container.innerHTML = html;
}

// ===========================
// Load Galleries
// ===========================

document.addEventListener("DOMContentLoaded", () => {

    createGallery("co2-gallery", projectGalleries.co2);           
    createGallery("ticketsys-gallery", projectGalleries.ticketsys);
	createGallery("PosSystem-gallery", projectGalleries.PosSystem);
	createGallery("flood-gallery", projectGalleries.flood);
});