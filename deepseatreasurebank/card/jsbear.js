
<script type="text/javascript">
        var la = document.getElementById('leftarrow');
        var ra = document.getElementById('rightarrow');
        
            la.onclick = function() {
                var ts = document.getElementById('profile-container');
                var parentPos = document.getElementById('biglong').getBoundingClientRect();
                var childPos  = document.getElementById('profile-container').getBoundingClientRect();
                var relativePosLeft   = childPos.left - parentPos.left;
                var newleft = relativePosLeft - 500;
                if (relativePosLeft >= -1000) {
                    ts.style.left = newleft + 'px';
                }
            }
            ra.onclick = function() {
                var ts = document.getElementById('profile-container');
                var parentPos = document.getElementById('biglong').getBoundingClientRect();
                var childPos  = document.getElementById('profile-container').getBoundingClientRect();
                var relativePosLeft   = childPos.left - parentPos.left;
                var newleftb = relativePosLeft + 500;
                if (relativePosLeft < 0) { 
                    ts.style.left = newleftb + 'px';
                }
            }
    </script>