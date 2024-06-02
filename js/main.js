var siteNameInput = document.getElementById( 'siteName' );
var siteUrlInput = document.getElementById( 'siteUrl' );
var siteList = [];
if ( localStorage.getItem( "SiteList" ) )
{
    siteList = JSON.parse( localStorage.getItem( "SiteList" ) );
    displayData();
}
function addURL ()
{
    if ( validateSiteName() && validateSiteURL() )
    {
        var site = {
            site_name: siteNameInput.value,
            site_url: siteUrlInput.value,
        };
        siteList.push( site );
        localStorage.setItem( "SiteList", JSON.stringify( siteList ) );
        displayData();
    }
}
function displayData ()
{
    console.log( siteList );
    var temp = "";
    for ( let i = 0; i < siteList.length; i++ )
    {
        temp += `<tr>
                    <td scope="row">${ i }</td>
                    <td>${ siteList[ i ].site_name }</td>
                    <td><button class="btn btn-visit"><i class="fa-solid fa-eye pe-1"></i><a href="${ siteList[ i ].site_url }" class="text-decoration-none text-white" target="_blank">Visit</a> </button></td>
                    <td><button class="btn btn-delete" onclick = "deleteURL( ${ i } )" ><i class="fa-solid fa-trash-can pe-1"></i> Delete</button></td>
                </tr>`;
    }
    document.getElementById( 'myData' ).innerHTML = temp;
}
function deleteURL ( index )
{
    siteList.splice( index, 1 );
    localStorage.setItem( "SiteList", JSON.stringify( siteList ) );
    displayData();
}
function validateSiteName ()
{
    var regexSiteName = /^[a-zA-Z]+[0-9]{0,5}$/;
    if ( regexSiteName.test( siteNameInput.value ) )
    {
        siteNameInput.classList.add( 'is-valid' );
        siteNameInput.classList.remove( 'is-invalid' );
        return true;
    } else
    {
        siteNameInput.classList.add( 'is-invalid' );
        siteNameInput.classList.remove( 'is-valid' );
        return false;
    }
} function validateSiteURL ()
{
    var regexSiteURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if ( regexSiteURL.test( siteUrlInput.value ) )
    {
        siteUrlInput.classList.add( 'is-valid' );
        siteUrlInput.classList.remove( 'is-invalid' );
        return true;
    } else
    {
        siteUrlInput.classList.add( 'is-invalid' );
        siteUrlInput.classList.remove( 'is-valid' );
        return false;
    }
}
siteNameInput.addEventListener( 'change', validateSiteName() );
siteUrlInput.addEventListener( 'change', validateSiteURL() );