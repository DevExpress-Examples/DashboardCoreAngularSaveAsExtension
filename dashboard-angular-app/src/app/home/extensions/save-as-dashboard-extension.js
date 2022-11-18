"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Designer = require("devexpress-dashboard/designer");
var ko = require("knockout");
var SaveAsDashboardExtension = /** @class */ (function () {
    function SaveAsDashboardExtension(dashboardControl, inputPopup) {
        var _this = this;
        this.dashboardControl = dashboardControl;
        this.inputPopup = inputPopup;
        this.name = "save-as-dashboard-extension";
        this.menuItem = new Designer.DashboardMenuItem("dashboard-save-as", "Save As...", 112, 0, function () {
            _this.inputPopup.inputText = _this.newName;
            _this.inputPopup.popupVisible = true;
        });
        this.menuItem.disabled = ko.computed(function () { return !dashboardControl.dashboard(); });
        this.newName = "New Dashboard Name";
        inputPopup.applyInput.subscribe(function (inputText) {
            _this.newName = inputText;
            _this.saveAs();
            _this.toolboxExtension.menuVisible(false);
        });
        inputPopup.cancelInput.subscribe(function () {
            _this.toolboxExtension.menuVisible(false);
        });
    }
    SaveAsDashboardExtension.prototype.saveAs = function () {
        this.toolboxExtension.menuVisible(false);
        this.newDashboardExtension.performCreateDashboard(this.newName, this.dashboardControl.dashboard().getJSON());
    };
    SaveAsDashboardExtension.prototype.start = function () {
        this.toolboxExtension.menuItems.push(this.menuItem);
    };
    SaveAsDashboardExtension.prototype.stop = function () {
        this.toolboxExtension.menuItems.remove(this.menuItem);
    };
    Object.defineProperty(SaveAsDashboardExtension.prototype, "toolboxExtension", {
        get: function () {
            var extension = this.dashboardControl.findExtension("toolbox");
            if (!extension) {
                throw Error("Save As Dashboard Extension requeries Toolbox Extension");
            }
            return extension;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SaveAsDashboardExtension.prototype, "newDashboardExtension", {
        get: function () {
            var extension = this.dashboardControl.findExtension("create-dashboard");
            if (!extension) {
                throw Error("Save As Dashboard Extension requeries Create Dashboard Extension");
            }
            return extension;
        },
        enumerable: true,
        configurable: true
    });
    return SaveAsDashboardExtension;
}());
exports.SaveAsDashboardExtension = SaveAsDashboardExtension;
//# sourceMappingURL=save-as-dashboard-extension.js.map