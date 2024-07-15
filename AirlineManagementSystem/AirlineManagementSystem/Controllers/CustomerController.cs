using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class CustomerController : Controller
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult Customer()
        {
            return View();
        }
        
        [HttpGet]
        public ActionResult GetData()
        {
            var data = (from R in db.AirLineRoutes
                        join C in db.Countries on R.CountryFrom equals C.CountryId
                        join Co in db.Countries on R.CountryTo equals Co.CountryId
                        join Ci in db.Cities on R.CityFrom equals Ci.CityId
                        join Cit in db.Cities on R.CityTo equals Cit.CityId
                        join A in db.Airports on R.AirportFrom equals A.AirportID
                        join Ai in db.Airports on R.AirportTo equals Ai.AirportID
                        select new MyModel()
                        {
                            Countryfrom = C,
                            Countryto = Co,
                            Cityfrom = Ci,
                            Cityto = Cit,
                            Airportfrom = A,
                            Airportto = Ai,
                            MyRoute = R
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}