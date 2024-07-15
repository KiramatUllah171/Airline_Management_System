using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class ReservationController : Controller
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult BookingDetail()
        {
            ViewBag.fare = farelist();
            return View();
        }
        [HttpPost]
        public ActionResult BookingDetail(Reservation r)
        {
            if (r.ReservationID > 0)
            {
                db.Entry(r).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Reservations.Add(r);
            }
            db.SaveChanges();
            ViewBag.fare = farelist();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int Id)
        {
            Reservation r = new Reservation();
            if (Id > 0)
            {
                r = db.Reservations.Where(x => x.ReservationID == Id).FirstOrDefault();
            }
            return Json(r, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetData()
        {
            var data = (from R in db.Reservations
                        join C in db.Cabins on R.CabinID equals C.CabinId
                        join S in db.Schedules on R.FlightScheduleId equals S.FlightScheduleID
                        select new MyModel
                        {
                            MySchedule = S,
                            MyCabin = C,
                            MyReservation = R
                        }
                      ).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public dynamic farelist()
        {
            var data = (from F in db.Fares
                        join R in db.AirLineRoutes on F.RouteID equals R.RouteID
                        join cf in db.Countries on R.CountryFrom equals cf.CountryId
                        join ct in db.Countries on R.CountryTo equals ct.CountryId
                        join cif in db.Cities on R.CityFrom equals cif.CityId
                        join cit in db.Cities on R.CityTo equals cit.CityId
                        join A in db.AirLines on F.AirlineId equals A.AirlineID
                        join C in db.Cabins on F.CabinID equals C.CabinId
                        select new MyModel
                        {
                            MyFare = F,
                            MyAirLine = A,
                            MyCabin = C,
                            MyRoute = R,
                            Countryfrom = cf,
                            Countryto = ct,
                            Cityfrom = cif,
                            Cityto = cit
                        }).ToList();
            return data;
        }
    }
}