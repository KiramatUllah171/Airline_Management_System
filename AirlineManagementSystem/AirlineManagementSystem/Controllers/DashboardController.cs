using AirlineManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers
{
    public class DashboardController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ProfileView()
        {
            int Adminid = Convert.ToInt32(Session["AdminId"]);
            return View(db.Admins.Where(x => x.AdminId == Adminid).FirstOrDefault());
        }

        public ActionResult SignOut()
        {
            Session.Clear();
            return RedirectToAction("LogIn", "Account");
        }
    }
}