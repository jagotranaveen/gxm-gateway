import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PanelMenu } from "primereact/panelmenu";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.min.css";
import "./SideNav.scss";

export default function TemplateDemo({isPanelCollapsed}) {
    const location = useLocation()
    const isPanelActive = location.pathname.split('/')[1];

    const itemRenderer = (item) => (
        <Link to={item.route} className={`${item.route === isPanelActive ? 'active' : 'inactive' } link flex align-items-center w-276px h-56px p-3 cursor-pointer`} >
            <span className={`${item.icon} `} />
            {!isPanelCollapsed && <span className={`mx-2 ${item.items && 'font-semibold'}`}>{item.label}</span>}
        </Link>
    );

    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-envelope',
            badge: 5,
            template: itemRenderer,
            route: "dashboard"
        },
        {
            label: 'Services & Projects',
            icon: 'pi pi-check-circle',
            shortcut: '⌘+R',
            template: itemRenderer,
            route: "services"
        },
        {
            label: 'My Entities',
            icon: 'pi pi-sitemap',
            shortcut: '⌘+W',
            template: itemRenderer,
            route: "entities"
        },
        {
            label: 'My Entities',
            icon: 'pi pi-sitemap',
            shortcut: '⌘+W',
            template: itemRenderer,
            route: "my-entities"
        },
        {
            label: 'Settings',
            icon: 'pi pi-cog',
            shortcut: '⌘+W',
            template: itemRenderer,
            route: "settings"
        }
    ];

    return (
        <div className="card flex justify-content-center ">
            <PanelMenu model={items} className="w-full bg-white md:w-20rem" />
        </div>
    )
}
