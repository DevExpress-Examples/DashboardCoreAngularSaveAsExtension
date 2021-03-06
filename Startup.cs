using DevExpress.AspNetCore;
using DevExpress.DashboardAspNetCore;
using DevExpress.DashboardCommon;
using DevExpress.DashboardWeb;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;

namespace ASPNETCoreDashboardAngular2 {
    public class Startup {
        public Startup(IConfiguration configuration, IHostEnvironment hostEnvironment) {
            Configuration = configuration;
            FileProvider = hostEnvironment.ContentRootFileProvider;
        }

        public IConfiguration Configuration { get; }
        public IFileProvider FileProvider { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services
                .AddControllersWithViews()
                .AddDefaultDashboardController(configurator => {
                    configurator.SetDashboardStorage(new CustomDashboardFileStorage(FileProvider.GetFileInfo("Data/Dashboards").PhysicalPath));

                    DataSourceInMemoryStorage dataSourceStorage = new DataSourceInMemoryStorage();
          
                    DashboardObjectDataSource objDataSource = new DashboardObjectDataSource("Object Data Source");
                    dataSourceStorage.RegisterDataSource("objectDataSource", objDataSource.SaveToXml());

                    configurator.SetDataSourceStorage(dataSourceStorage);

                    configurator.DataLoading += (s, e) => {
                        if (e.DataSourceName == "Object Data Source") {
                            e.Data = SalesPersonData.GetSalesData();
                        }
                    };
                });

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration => {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddDevExpressControls();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            } else {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            if (!env.IsDevelopment()) {
                app.UseSpaStaticFiles();
            }

            app.UseDevExpressControls();

            app.UseRouting();

            app.UseEndpoints(endpoints => {
                EndpointRouteBuilderExtension.MapDashboardRoute(endpoints, "api/dashboard");
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSpa(spa => {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment()) {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
