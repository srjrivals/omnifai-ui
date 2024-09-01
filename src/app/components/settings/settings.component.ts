import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CallSettingsService } from '../../services/call-settings.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  // Track the current section
  currentSection: 'call' | 'agent' = 'call';
  pageTitle = ' Call Settings';
  form: FormGroup;
  timeWindows = ['Morning', 'Afternoon', 'Evening'];
  daysOfWeekOptions = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  currentSettingsId: any;

  constructor(
    private fb: FormBuilder,
    private callSettingsService: CallSettingsService,
    private navbarService: NavbarService
  ) {
    this.form = this.fb.group({
      timeWindow: [''],
      timesPerDay: [''],
      timesPerWeek: [''],
      // Create FormControls for each day directly under the form group
      monday: new FormControl(false),
      tuesday: new FormControl(false),
      wednesday: new FormControl(false),
      thursday: new FormControl(false),
      friday: new FormControl(false),
      saturday: new FormControl(false),
      sunday: new FormControl(false)
    });
  }
  ngOnDestroy(): void {
    this.navbarService.setMenuItems([]);
  }

  ngOnInit(): void {
    this.callSettingsService.getCallSettings().subscribe(settingsArray => {
      if (settingsArray && settingsArray.length > 0) {
        this.timeWindows = Array.from(new Set(settingsArray.map(setting => setting.timeWindow)));
        const activeSetting = settingsArray.find(s => s.active); // Find the active setting
        if (activeSetting) {
          this.currentSettingsId = activeSetting.id;
          this.form.patchValue({
            timeWindow: activeSetting.timeWindow,
            timesPerDay: activeSetting.timesPerDay,
            timesPerWeek: activeSetting.timesPerWeek,
            monday: activeSetting.monday,
            tuesday: activeSetting.tuesday,
            wednesday: activeSetting.wednesday,
            thursday: activeSetting.thursday,
            friday: activeSetting.friday,
            saturday: activeSetting.saturday,
            sunday: activeSetting.sunday
          });
        }
      }
    });

    this.navbarService.setMenuItems([
      { label: 'Call Settings', action: () => this.showSection('call'), class: 'btn-secondary active' },
      { label: 'Agents Settings', action: () => this.showSection('agent'), class: 'btn-secondary' }
    ]);
  }

  showSection(section: 'call' | 'agent'): void {
    this.currentSection = section;
    this.navbarService.setMenuItems([
      { label: 'Call Settings', action: () => this.showSection('call'), class: section === 'call' ? 'btn-primary' : 'btn-secondary' },
      { label: 'Agents Settings', action: () => this.showSection('agent'), class: section === 'agent' ? 'btn-primary' : 'btn-secondary' }
    ]);
  }

  saveSettings(): void {
    const formValues = this.form.value;

    const updatedSettings = {
      id: this.currentSettingsId,  // Include the ID of the setting being updated
      timeWindow: formValues.timeWindow,
      timesPerDay: formValues.timesPerDay,
      timesPerWeek: formValues.timesPerWeek,
      monday: formValues.monday,
      tuesday: formValues.tuesday,
      wednesday: formValues.wednesday,
      thursday: formValues.thursday,
      friday: formValues.friday,
      saturday: formValues.saturday,
      sunday: formValues.sunday,
      active: true  // Assuming the current setting being saved is the active one
    };

    // Save updated settings to the server
    this.callSettingsService.updateCallSettings(updatedSettings).subscribe(response => {
      console.log('Settings saved successfully', response);
      // Optionally show a success message or refresh the settings
    }, error => {
      console.error('Error saving settings', error);
      // Optionally show an error message
    });
  }
}