import * as Dashboard from 'devexpress-dashboard'
import * as Designer from 'devexpress-dashboard/designer'
import * as ko from 'knockout';

import { InputPopupComponent } from '../input-popup.component';

export class SaveAsDashboardExtension implements Dashboard.IExtension {
  public name: string;
  private newName: string;
  private menuItem: Designer.DashboardMenuItem;

  constructor(private dashboardControl: Dashboard.DashboardControl, private inputPopup: InputPopupComponent) {
    this.name = "save-as-dashboard-extension";

    this.menuItem = new Designer.DashboardMenuItem("dashboard-save-as", "Save As...", 112, 0, () => {
      this.inputPopup.inputText = this.newName;
      this.inputPopup.popupVisible = true;
    });

    this.menuItem.disabled = ko.computed(() => !dashboardControl.dashboard());
    this.newName = "New Dashboard Name";

    inputPopup.applyInput.subscribe(inputText => {
      this.newName = inputText;
      this.saveAs();
      this.toolboxExtension.menuVisible(false);
    });
    inputPopup.cancelInput.subscribe(() => {
      this.toolboxExtension.menuVisible(false);
    });
  }

  saveAs() {
    this.toolboxExtension.menuVisible(false);
    this.newDashboardExtension.performCreateDashboard(this.newName, this.dashboardControl.dashboard().getJSON());
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
  private get newDashboardExtension(): Designer.CreateDashboardExtension {
    let extension = this.dashboardControl.findExtension("create-dashboard");

    if (!extension) {
      throw Error("Save As Dashboard Extension requeries Create Dashboard Extension");
    }

    return <Designer.CreateDashboardExtension>extension;
  }
}
