/**
 * Create a Money Transaction
 * @param {org.gowo.network.money.CreateTransaction} moneyData
 * @transaction
 */
function createTransaction(moneyData){
    return getAssetRegistry('org.gowo.network.money.Money')
    .then(function(moneyRegistry){
        var factory = getFactory();
        var NS = 'org.gowo.network.money';

        var walletID = 'WE-HOM-222';
        var money = factory.newResource(NS,'Money',walletID);

        money.amtToSend = moneyData.amtToSend;
        money.senderID = moneyData.senderID;
        money.recieverID = moneyData.recieverID;
        money.transactionDate = moneyData.transactionDate;

        var event = factory.newEvent(NS, 'TransactionCreated');
        event.walletID = walletID;
        emit(event);

        return moneyRegistry.addAll([money]);

    })
}