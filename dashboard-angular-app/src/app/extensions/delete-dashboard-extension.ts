import * as Dashboard from 'devexpress-dashboard'
import * as Designer from 'devexpress-dashboard/designer'
import * as ko from 'knockout';

import { confirm } from 'devextreme/ui/dialog';

import { DeleteDashboardService } from '../delete-dashboard.service';

export class DeleteDashboardExtension implements Dashboard.IExtension {
  public name: string;
  private newName: string;
  private menuItem: Designer.DashboardMenuItem;

  constructor(private dashboardControl: Dashboard.DashboardControl, private userService: DeleteDashboardService) {
    this.name = "delete-dashboard-extension";

    this.menuItem = new Designer.DashboardMenuItem("dashboard-delete", "Delete", 113, 0, () => {
      this.deleteDashboard();
    });

    this.menuItem.disabled = ko.computed(() => !dashboardControl.dashboard());
  }

  deleteDashboard() {
    let result = confirm("<b>Delete this Dashboard?</b>", "Confirm delete");

    result.then(dialogResult => {
      if (dialogResult) {
        var dashboardId = this.dashboardControl.dashboardContainer().id;

        this.toolboxExtension.menuVisible(false);

        this.userService.sendPostRequest(dashboardId).subscribe(data => {
          this.dashboardControl.unloadDashboard();
        });
      } 
    });
  }

  start() {
    this.toolboxExtension.menuItems.push(this.menuItem);
  }

  stop() {
    this.toolboxExtension.menuItems.remove(this.menuItem);
  }

  private get toolboxExtension(): Designer.ToolboxExtension {
    let extension = this.dashboardControl.findExtension("toolbox");

    if (!extension) {
      throw Error("Save As Dashboard Extension requeries Toolbox Extension");
    }

    return <Designer.ToolboxExtension>extension;
  }
}
