from django.contrib import admin
from .models import Room, Place, Reservation, ReservationHistory
from django.utils.safestring import mark_safe

admin.site.register(Reservation)
admin.site.register(ReservationHistory)

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    list_display_links = ('name', 'slug')
    fields = ('places', 'name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    filter_horizontal = ('places',)
          

@admin.register(Place)
class PlaceAdmin(admin.ModelAdmin):
    list_display = ('image_show', 'name', 'slug', 'status')
    list_display_links = ('image_show', 'name', 'slug', 'status')
    fields = ('image', 'name', 'slug', 'status')
    prepopulated_fields = {'slug': ('name',)}
    
    
    def image_show(self,obj):
        if obj.image:
            return mark_safe("<img src='{}' width='60' />".format(obj.image.url))
        return "None"
    
    image_show.__name__ = "Фото места"
    