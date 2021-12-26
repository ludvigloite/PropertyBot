if (localStorage.getItem('varKey') === null) { 
                localStorage.setItem('varKey', "");
                document.write("Ingen"); 
            }
            else {
                if (localStorage.getItem('varKey') === "") { 
                    document.write("Ingen"); 
                } else if (localStorage.getItem('varKey') === "Li") { 
                    document.write("Lisa"); 
                } else if (localStorage.getItem('varKey') === "Aa") { 
                    document.write("Aanon"); 
                }
            }
          