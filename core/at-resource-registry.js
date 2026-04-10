(function () {
    'use strict';
    window.__CPII__ = window.__CPII__ || {};
    window.__CPII__.RESOURCE_REGISTRY = {
            'gd-dashboard': {
                id: 'gd-dashboard',
                type: 'gadget',
                url: 'gadgets/gd-dashboard.js',
                labelKey: 'nav_dashboard',
                icon: 'dashboard',
                tagName: 'gd-dashboard',
                status: 'production'
            },
            'gd-manual': {
                id: 'gd-manual',
                type: 'gadget',
                url: 'gadgets/gd-manual.js',
                labelKey: 'nav_manuals',
                icon: 'menu_book',
                tagName: 'gd-manual',
                status: 'production'
            },
            'gd-simulador': {
                id: 'gd-simulador',
                type: 'gadget',
                url: 'gadgets/gd-simulador.js',
                labelKey: 'nav_simulator',
                icon: 'calculate',
                tagName: 'gd-simulador',
                status: 'draft'
            },
            'gd-calculadora': {
                id: 'gd-calculadora',
                type: 'gadget',
                url: 'gadgets/gd-calculadora.js',
                labelKey: 'nav_calculator',
                icon: 'functions',
                tagName: 'gd-calculadora',
                status: 'draft'
            }
    };
})();