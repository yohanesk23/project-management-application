using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Work.Models;

namespace Work.Controllers
{
    public class WorkController : Controller
    {
        private readonly List<WorkId> list = new List<WorkId>()
        {
            new WorkId()
            {
                WorkOrder = 0,
                Facility = "Fac1",
                EquipmentId = "P000",
                Priority = 1,
                Submission = new DateTime(2001, 11, 20),
                TimeComplete = 4,
                Status = "open"
            },
            new WorkId()
            {
                WorkOrder = 1,
                Facility = "Fac2",
                EquipmentId = "Con000",
                Priority = 2,
                Submission = new DateTime(2001, 11, 21),
                TimeComplete = 5,
                Status = "open"
            },
            new WorkId()
            {
                WorkOrder = 2,
                Facility = "Fac4",
                EquipmentId = "Sep000",
                Priority = 4,
                Submission = new DateTime(2001, 11, 24),
                TimeComplete = 1,
                Status = "open"
            },
        };

        private readonly List<Technician> listTech = new List<Technician>()
        {
            new Technician()
            {
                Name = "Bob",
                Equipment = "Pump"
            },
            new Technician()
            {
                Name = "Sam",
                Equipment = "Conveyer"
            },
            new Technician()
            {
                Name = "Kim",
                Equipment = "Separator"
            }
        };

        [HttpGet("api/user")]
        public IActionResult Get()
        {
            return this.Ok(list);
        }

        [HttpPut("api/insert")]
        public IActionResult Put(string Facility, string EquipmentId, int Priority, int TimeComplete)
        {
            var newlist = list;
            list.Add(new WorkId()
            {
                WorkOrder = list[2].WorkOrder + 1,
                Facility = Facility,
                EquipmentId = EquipmentId,
                Priority = Priority,
                TimeComplete = TimeComplete,
                Submission = new DateTime(2001,11,11),
                Status = "open"
            });
            return this.Ok(newlist);
        }
        
        [HttpPut("api/technician")]
        public IActionResult Put(int WorkOrder, string Technician)
        {
            var assign = list;
            assign[WorkOrder].Status = "On Going";
            assign[WorkOrder].Technician = Technician;
            
            return this.Ok(assign);
        }

        [HttpGet("api/Equipment/{id}")]
        public IActionResult GetTechnician(string id)
        {
            var newList = new List<Technician>();
            foreach (var tech in listTech)
            {
                if (tech.Equipment.Contains(id))
                {
                    newList.Add(tech);
                }
            }

            return this.Ok(newList);
        }
    }
}