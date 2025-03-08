// Opening Animation
document.addEventListener('DOMContentLoaded', () => {
    // Logo animation
    const logo = document.querySelectorAll('.logo');
    const intro = document.querySelector('.intro');
    
    setTimeout(() => {
        logo.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 400);
        });
        
        setTimeout(() => {
            logo.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);
            });
        }, 2000);
        
        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 2300);
    }, 500);
    
    // Skills Donut Chart
    const drawDonutChart = () => {
        const chart = document.getElementById('skills-chart');
        if (!chart) return;
        
        const skills = [
            { name: 'Linux', percentage: 95, color: getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() },
            { name: 'Python', percentage: 85, color: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim() },
            { name: 'JavaScript', percentage: 50, color: getComputedStyle(document.documentElement).getPropertyValue('--accent-blue').trim() }
        ];
        
        // Calculate total for percentages
        const total = skills.reduce((acc, skill) => acc + skill.percentage, 0);
        
        // Create conic gradient
        let gradient = 'conic-gradient(';
        let startAngle = 0;
        
        skills.forEach((skill, index) => {
            const angle = (skill.percentage / total) * 360;
            const endAngle = startAngle + angle;
            
            gradient += `${skill.color} ${startAngle}deg ${endAngle}deg`;
            
            if (index < skills.length - 1) {
                gradient += ', ';
            }
            
            startAngle = endAngle;
        });
        
        gradient += ')';
        chart.style.background = gradient;
    };
    
    // Call the function to draw the chart
    drawDonutChart();
    
    // Cursor light effect
    const cursorLight = document.createElement('div');
    cursorLight.classList.add('cursor-light');
    document.body.appendChild(cursorLight);
    
    document.addEventListener('mousemove', (e) => {
        cursorLight.style.left = e.clientX + 'px';
        cursorLight.style.top = e.clientY + 'px';
    });
    
    // Make the light bigger on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .nav-links li, .portfolio-item, .social-links a, .skill-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorLight.style.width = '200px';
            cursorLight.style.height = '200px';
            cursorLight.style.background = 'radial-gradient(circle, rgba(254, 128, 25, 0.4) 0%, rgba(254, 128, 25, 0) 70%)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorLight.style.width = '150px';
            cursorLight.style.height = '150px';
            cursorLight.style.background = 'radial-gradient(circle, rgba(254, 128, 25, 0.3) 0%, rgba(254, 128, 25, 0) 70%)';
        });
    });
    
    // Navigation menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Scroll event with improved behavior
    const header = document.querySelector('header');
    
    // Check initial scroll position
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add active class to current section in navigation
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(li => {
            li.classList.remove('active');
            if (li.querySelector('a').getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
    
    // Portfolyo öğeleri için hover efekti
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
}); 