using Microsoft.AspNetCore.Mvc;

namespace ASPNETCoreDashboardAngular2.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class UserDashboardController : ControllerBase {
        [HttpPost]
        public IActionResult DeleteDashboard([FromBody] DahhboardInfo info) {
            CustomDashboardFileStorage newDashboardStorage = new CustomDashboardFileStorage("Data\\Dashboards");
            newDashboardStorage.DeleteDashboard(info.DashboardID);
            return new EmptyResult();
        }
    }

    public class DahhboardInfo {
        public string DashboardID { get; set; }
    }
}
