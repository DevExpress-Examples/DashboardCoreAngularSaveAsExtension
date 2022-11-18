"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Designer = require("devexpress-dashboard/designer");
var ko = require("knockout");
var dialog_1 = require("devextreme/ui/dialog");
var DeleteDashboardExtension = /** @class */ (function () {
    function DeleteDashboardExtension(dashboardControl, userService) {
        var _this = this;
        this.dashboardControl = dashboardControl;
        this.userService = userService;
        this.name = "delete-dashboard-extension";
        this.menuItem = new Designer.DashboardMenuItem("dashboard-delete", "Delete", 113, 0, function () {
            _this.deleteDashboard();
        });
        this.menuItem.disabled = ko.computed(function () { return !dashboardControl.dashboard(); });
    }
    DeleteDashboardExtension.prototype.deleteDashboard = function () {
        var _this = this;
        var result = dialog_1.confirm("<b>Delete this Dashboard?</b>", "Confirm delete");
        result.then(function (dialogResult) {
            if (dialogResult) {
                var dashboardId = _this.dashboardControl.dashboardContainer().id;
                _this.toolboxExtension.menuVisible(false);
                _this.userService.sendPostRequest({ DashboardID: dashboardId }).subscribe(function (data) {
                    _this.dashboardControl.unloadDashboard();
                });
            }
        });
    };
    DeleteDashboardExtension.prototype.start = function () {
        this.toolboxExtension.menuItems.push(this.menuItem);
    };
    DeleteDashboardExtension.prototype.stop = function () {
        this.toolboxExtension.menuItems.remove(this.menuItem);
    };
    Object.defineProperty(DeleteDashboardExtension.prototype, "toolboxExtension", {
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
    return DeleteDashboardExtension;
}());
exports.DeleteDashboardExtension = DeleteDashboardExtension;
//# sourceMappingURL=delete-dashboard-extension.js.map