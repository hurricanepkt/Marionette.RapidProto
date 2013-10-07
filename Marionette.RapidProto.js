_.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /\{\{(.+?)\}\}/g,
    escape: /<%-([\s\S]+?)%>/g

};

var App = new Backbone.Marionette.Application();
App.addRegions({
    listRegion: "#ListRegion",
    editRegion: "#EditRegion",
    displayRegion: "#DisplayRegion"
});
App.Item = Backbone.Model.extend({
    idAttribute: window.idAttr,
    url: function () {
        return window.fetchurl + '/' + this.id;
    }
});
App.Items = Backbone.Collection.extend({
    model: App.Item,
    url: function () {
        return window.fetchurl;
    }
});
App.NoItemsView = Backbone.Marionette.ItemView.extend({
    template: '#no-item-view-template'
});
App.ItemView = Backbone.Marionette.ItemView.extend({
    tagName: 'a',
    attributes: {
        href: "#"
    },
    events: {
        "click": "selected"
    },
    selected: function (f) {
        f.preventDefault();
        App.displayRegion.show(new App.DetailsView({ model: this.model }));
    },
    template: '#item-view-template'
});
App.DetailsView = Backbone.Marionette.ItemView.extend({
    template: "#item-display-view-template"
});

App.ItemsView = Backbone.Marionette.CollectionView.extend({
    itemView: App.ItemView
});

function queryObj() {
    var result = {}, keyValuePairs = location.search.slice(1).split('&');
    for (var i = 0; i < keyValuePairs.length; i++) {
        var keyValuePair = keyValuePairs[i];
        keyValuePair = keyValuePair.split('=');
        result[keyValuePair[0]] = keyValuePair[1] || '';
    }
    return result;
}
window.qs = queryObj();

App.addInitializer(function () {
    if (window.showList) {
        App.items = new App.Items();
        App.itemsView = new App.ItemsView({
            collection: App.items
        });
        App.listRegion.show(App.itemsView);
        App.items.fetch();
    }
});