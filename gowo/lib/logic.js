/**
 * Create a Document Transaction
 * @param {org.gowo.network.document.CreateDocument} documentData
 * @transaction
 */
function createDocument(documentData){
    return getAssetRegistry('org.gowo.network.document.Document')
    .then(function(documentRegistry){
        var factory = getFactory();
        var NS = 'org.gowo.network.document';

        var documentID = 'CE502-05-12-18';
        var document = factory.newResource(NS,'Document',documentID);

        document.creationDate = documentData.creationDate;
        document.origin = documentData.origin;
        document.destination = documentData.destination;

        var event = factory.newEvent(NS, 'DocumentCreated');
        event.documentID = documentID;
        emit(event);

        return documentRegistry.addAll([document]);
    })
}

